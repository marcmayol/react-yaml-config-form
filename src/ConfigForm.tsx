import React, { useState } from "react"
import { ConfigFormProps, ConfigValues, YamlField } from "./types"

export function ConfigForm({
                               schema,
                               initialValues,
                               onChange,
                               onSubmit,
                               validateOnChange = true,
                               className,
                               formId,
                               styles: styleMap,
                               renderField
                           }: ConfigFormProps) {

    if (!schema || !Array.isArray(schema.fields)) {
        console.warn("ConfigForm: schema or schema.fields is missing or invalid", schema)
        return <p>Invalid schema or missing fields</p>
    }

    const [values, setValues] = useState<ConfigValues>(() =>
        Object.fromEntries(
            schema.fields.map(f => [
                f.name,
                initialValues?.[f.name] ??
                f.default ??
                (f.type === "boolean" ? false : "")
            ])
        )
    )
    const [errors, setErrors] = useState<Record<string, string>>({})

    function validate() {
        const e: Record<string, string> = {}

        for (const f of schema.fields) {
            const v = values[f.name]

            if (f.required && (v === "" || v === null || typeof v === "undefined")) {
                e[f.name] = f.message || "This field is required"
                continue
            }

            if (v === "" || v === null || typeof v === "undefined") continue

            if (f.type === "email" && typeof v === "string") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(v)) e[f.name] = f.message || "Invalid email address"
            }

            if (f.minLength && typeof v === "string" && v.length < f.minLength) {
                e[f.name] = f.message || `Minimum length is ${f.minLength}`
            }
            if (f.maxLength && typeof v === "string" && v.length > f.maxLength) {
                e[f.name] = f.message || `Maximum length is ${f.maxLength}`
            }

            if (f.pattern && typeof v === "string") {
                const regex = new RegExp(f.pattern)
                if (!regex.test(v)) e[f.name] = f.message || "Invalid format"
            }

            if (f.matchField && v !== values[f.matchField]) {
                e[f.name] = f.message || `Must match ${f.matchField}`
            }

            if (f.type === "number" && typeof v === "number") {
                if (f.min !== undefined && v < f.min)
                    e[f.name] = f.message || `Minimum value is ${f.min}`
                if (f.max !== undefined && v > f.max)
                    e[f.name] = f.message || `Maximum value is ${f.max}`
            }
        }

        return e
    }

    function handleChange(name: string, value: any) {
        const newValues = { ...values, [name]: value }
        setValues(newValues)

        if (validateOnChange) {
            const errs = validate()
            setErrors(errs)
            onChange?.(newValues, Object.keys(errs).length === 0)
        } else {
            onChange?.(newValues, true)
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const errs = validate()
        setErrors(errs)
        onSubmit?.(values, Object.keys(errs).length === 0)
    }

    const id = formId || schema.id || "yaml-form"

    function defaultRender(field: YamlField) {
        const v = values[field.name]
        const err = errors[field.name]

        if (field.type === "boolean")
            return (
                <label className={styleMap?.field}>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className={styleMap?.checkbox}
                            checked={Boolean(v)}
                            onChange={e => handleChange(field.name, e.target.checked)}
                        />
                        <span className={styleMap?.label}>{field.label}</span>
                    </div>
                    {err && <span className={styleMap?.error}>{err}</span>}
                </label>
            )

        if (field.type === "select")
            return (
                <div className={styleMap?.field}>
                    <label className={styleMap?.label}>
                        {field.label}
                        {field.required && <span className={styleMap?.required}>*</span>}
                    </label>
                    <select
                        className={styleMap?.select}
                        value={v ?? ""}
                        onChange={e => handleChange(field.name, e.target.value)}
                    >
                        <option value="">Select</option>
                        {field.options?.map(o => (
                            <option key={String(o)} value={String(o)}>
                                {String(o)}
                            </option>
                        ))}
                    </select>
                    {err && <span className={styleMap?.error}>{err}</span>}
                </div>
            )

        if (field.type === "textarea")
            return (
                <div className={styleMap?.field}>
                    <label className={styleMap?.label}>
                        {field.label}
                        {field.required && <span className={styleMap?.required}>*</span>}
                    </label>
                    <textarea
                        className={styleMap?.textarea}
                        value={v ?? ""}
                        onChange={e => handleChange(field.name, e.target.value)}
                    />
                    {err && <span className={styleMap?.error}>{err}</span>}
                </div>
            )

        if (field.type === "file")
            return (
                <div className={styleMap?.field}>
                    <label className={styleMap?.label}>
                        {field.label}
                        {field.required && <span className={styleMap?.required}>*</span>}
                    </label>
                    <input
                        className={styleMap?.input}
                        type="file"
                        accept={field.accept}
                        onChange={e =>
                            handleChange(field.name, e.target.files?.[0] || null)
                        }
                    />
                    {err && <span className={styleMap?.error}>{err}</span>}
                </div>
            )

        const typeMap: Record<string, string> = {
            text: "text",
            number: "number",
            password: "password",
            email: "email",
            date: "date",
            datetime: "datetime-local",
            time: "time",
            color: "color",
            range: "range",
            url: "url",
            hidden: "hidden"
        }

        const inputType = typeMap[field.type] || "text"

        return (
            <div className={styleMap?.field}>
                <label className={styleMap?.label}>
                    {field.label}
                    {field.required && <span className={styleMap?.required}>*</span>}
                </label>
                <input
                    className={styleMap?.input}
                    type={inputType}
                    value={v ?? ""}
                    placeholder={field.placeholder}
                    onChange={e =>
                        handleChange(
                            field.name,
                            field.type === "number" ? Number(e.target.value) : e.target.value
                        )
                    }
                    min={field.min}
                    max={field.max}
                    step={field.step}
                />
                {err && <span className={styleMap?.error}>{err}</span>}
            </div>
        )
    }

    return (
        <form id={id} className={className || styleMap?.form} onSubmit={handleSubmit}>
            {schema.title && <h2 className={styleMap?.title}>{schema.title}</h2>}
            {schema.description && (
                <p className={styleMap?.description}>{schema.description}</p>
            )}
            <div className={styleMap?.grid}>
                {schema.fields.map(f => (
                    <div key={f.name} className={styleMap?.item}>
                        {renderField
                            ? renderField(f, values[f.name], errors[f.name], handleChange)
                            : defaultRender(f)}
                    </div>
                ))}
            </div>
            {onSubmit && (
                <button type="submit" className={styleMap?.submit}>
                    {schema.submitLabel || "Save"}
                </button>
            )}
        </form>
    )
}
