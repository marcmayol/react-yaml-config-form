import { ConfigFormFromSource } from "../src/ConfigFormFromSource"

export default function App() {
    return (
        <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
            <h1>React YAML Config Form</h1>
            <ConfigFormFromSource
                src="/config.yml"
                onSubmit={(values, ok) => ok && console.log("Form data:", values)}
            />
        </div>
    )
}
