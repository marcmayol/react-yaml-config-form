import React from "react"
import { parseYamlSchema } from "./parseYamlSchema"
import { ConfigForm } from "./ConfigForm"
import { ConfigFormProps } from "./types"

export const ConfigFormFromYaml: React.FC<
    Omit<ConfigFormProps, "schema"> & { yaml: string }
> = ({ yaml, ...props }) => {
    const schema = parseYamlSchema(yaml)
    return <ConfigForm {...props} schema={schema} />
}
