
export type FieldType =
    | "text"
    | "number"
    | "boolean"
    | "select"
    | "textarea"
    | "password"
    | "email"
    | "date"
    | "datetime"
    | "time"
    | "color"
    | "range"
    | "file"
    | "url"
    | "hidden"

export interface YamlField {
    name: string
    label?: string
    type: FieldType
    required?: boolean
    default?: any
    options?: Array<string | number>
    placeholder?: string
    helpText?: string
    min?: number
    max?: number
    step?: number
    accept?: string

    /* New validation options */
    pattern?: string
    minLength?: number
    maxLength?: number
    matchField?: string
    message?: string
}

export interface YamlFormSchema {
    id?: string
    title?: string
    description?: string
    submitLabel?: string
    fields: YamlField[]
}

export type ConfigValues = Record<string, any>

export interface ConfigFormProps {
    schema: YamlFormSchema
    initialValues?: ConfigValues
    onChange?: (values: ConfigValues, isValid: boolean) => void
    onSubmit?: (values: ConfigValues, isValid: boolean) => void
    validateOnChange?: boolean
    className?: string
    formId?: string
    styles?: Record<string, string>
    renderField?: (field: YamlField, value: any, error: string | undefined, handleChange: (n: string, v: any) => void) => React.ReactNode
}
