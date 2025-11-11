import React, { useEffect, useState } from "react"
import { parseYamlSchema } from "./parseYamlSchema"
import { ConfigForm } from "./ConfigForm"
import { ConfigFormProps } from "./types"

export const ConfigFormFromSource: React.FC<
    Omit<ConfigFormProps, "schema"> & { src: string }
> = ({ src, ...props }) => {
    const [yamlText, setYamlText] = useState<string | null>(null)

    useEffect(() => {
        // Detecta si es una ruta relativa dentro del bundle (por ejemplo ./config.yml)
        const isRelative = !/^https?:\/\//.test(src)
        const url = isRelative ? new URL(src, import.meta.url).href : src

        fetch(url)
            .then(r => {
                if (!r.ok) throw new Error(`Could not load YAML: ${r.statusText}`)
                return r.text()
            })
            .then(setYamlText)
            .catch(console.error)
    }, [src])

    if (!yamlText) return <p>Loading...</p>

    const schema = parseYamlSchema(yamlText)
    return <ConfigForm {...props} schema={schema} />
}
