import YAML from "yaml"
import { YamlFormSchema } from "./types"

export function parseYamlSchema(yamlText: string): YamlFormSchema {
    return YAML.parse(yamlText)
}
