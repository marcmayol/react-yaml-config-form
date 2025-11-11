<p align="center">
  <b>Generate React forms directly from YAML ⚙️</b><br/>
  <a href="https://www.npmjs.com/package/react-yaml-config-form"><img src="https://img.shields.io/npm/v/react-yaml-config-form.svg?color=007acc"></a>
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue.svg">
  <img src="https://img.shields.io/badge/React-18+-lightblue.svg">
</p>

# react-yaml-config-form

[![npm version](https://img.shields.io/npm/v/react-yaml-config-form.svg?color=007acc)](https://www.npmjs.com/package/react-yaml-config-form)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)]()
[![React](https://img.shields.io/badge/React-18+-lightblue.svg)]()

> **react-yaml-config-form** is a lightweight React library that dynamically generates configuration forms from YAML files or URLs.
> It’s built for developers who need customizable forms for settings, dashboards, or admin panels — without writing manual form logic.

---

## 🚀 Features

* Generate forms directly from **YAML files** or **remote YAML sources**
* Supports a wide range of field types:
  `text`, `number`, `password`, `email`, `select`, `boolean`, `textarea`, `color`, `range`, `file`, `date`, `datetime`, `time`, `url`, and more
* Built-in **validation** for required fields, min/max values, regex patterns, and matching fields
* Fully **typed with TypeScript**
* Easy to **customize styling** or field rendering
* Supports **live validation**, `onChange` and `onSubmit` handlers
* Works perfectly with **React 18+** and **Vite**

---

## 🧩 Installation

```bash
npm install react-yaml-config-form
```

or with yarn:

```bash
yarn add react-yaml-config-form
```

---

## ⚙️ Quick Start

Create a simple YAML configuration file (e.g. `config.yml`):

```yaml
id: app_config
title: Application Settings
description: Example form generated from YAML
submitLabel: Save
fields:
  - name: username
    label: Username
    type: text
    required: true
    minLength: 3
  - name: password
    label: Password
    type: password
    required: true
  - name: confirm
    label: Confirm Password
    type: password
    matchField: password
    message: Passwords must match
  - name: notifications
    label: Enable Notifications
    type: boolean
    default: true
  - name: theme
    label: Theme Color
    type: color
    default: "#3366ff"
```

Then use it in your React app:

```tsx
import { ConfigFormFromSource } from "react-yaml-config-form"

export default function App() {
  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <ConfigFormFromSource
        src="/config.yml"
        onSubmit={(values, isValid) => {
          if (isValid) console.log("Submitted:", values)
        }}
        styles={{
          form: "p-4 border rounded bg-gray-50 space-y-3",
          label: "font-semibold",
          submit: "bg-blue-600 text-white px-3 py-2 rounded"
        }}
      />
    </div>
  )
}
```

---

## 🧠 API Overview

### `ConfigForm`

Renders a form directly from a YAML schema object.

```tsx
import { ConfigForm } from "react-yaml-config-form"

<ConfigForm
  schema={myYamlSchema}
  onChange={(values, isValid) => console.log(values, isValid)}
  onSubmit={(values) => console.log("Submitted:", values)}
/>
```

### `ConfigFormFromYaml`

Parses a YAML string directly.

```tsx
import { ConfigFormFromYaml } from "react-yaml-config-form"

<ConfigFormFromYaml
yaml={myYamlString}
onSubmit={(values) => console.log(values)}
/>
```

### `ConfigFormFromSource`

Fetches YAML from a file or URL.

```tsx
import { ConfigFormFromSource } from "react-yaml-config-form"

<ConfigFormFromSource
src="/settings.yml"
onSubmit={(values) => console.log(values)}
/>
```

---

## 🧩 Field Types

| Type                         | Description           |
| ---------------------------- | --------------------- |
| `text`                       | Standard text input   |
| `number`                     | Numeric field         |
| `boolean`                    | Checkbox              |
| `select`                     | Dropdown selector     |
| `textarea`                   | Multi-line text       |
| `password`                   | Password input        |
| `email`                      | Email validation      |
| `color`                      | Color picker          |
| `date` / `datetime` / `time` | Date and time pickers |
| `file`                       | File upload input     |
| `range`                      | Slider                |
| `url`                        | URL input             |
| `hidden`                     | Hidden field          |

---

## ✅ Validation Rules

Each field supports the following validation options:

| Option                    | Type      | Description                     |
| ------------------------- | --------- | ------------------------------- |
| `required`                | `boolean` | Marks the field as mandatory    |
| `pattern`                 | `string`  | Regex pattern for validation    |
| `minLength` / `maxLength` | `number`  | Enforces text length            |
| `min` / `max`             | `number`  | Enforces numeric range          |
| `matchField`              | `string`  | Requires matching another field |
| `message`                 | `string`  | Custom error message            |

---

## 🎨 Styling

You can easily override styles using the `styles` prop.

Example:

```tsx
styles={{
  form: "my-form-class",
  label: "text-sm text-gray-800",
  input: "border rounded px-2 py-1",
  error: "text-red-600 text-xs",
  submit: "bg-indigo-600 text-white px-3 py-2 rounded"
}}
```

Each class name maps to a specific element inside the form.

---

## 🧪 Development Setup

Clone the repo and start the example:

```bash
git clone https://github.com/yourusername/react-yaml-config-form
cd react-yaml-config-form
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) to preview the example app.

---

## 🧱 Project Structure

```
react-yaml-config-form/
├── src/
│   ├── ConfigForm.tsx
│   ├── ConfigFormFromYaml.tsx
│   ├── ConfigFormFromSource.tsx
│   ├── parseYamlSchema.ts
│   ├── types.ts
│   └── index.ts
├── example/
│   ├── App.tsx
│   ├── config.yml
│   ├── main.tsx
│   └── vite.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📦 Build for Production

```bash
npm run build
```

Outputs compiled files to `dist/` in both **ESM** and **CJS** formats with `.d.ts` types.

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Marc Mayol**
AI Engineer & Professor
- x (twitter): [@srmarcmayol](https://x.com/srmarcmayol)
- website: [marcmayol.com](https://marcmayol.com)
- LinkedIn: [https://www.linkedin.com/in/marc-mayol/](https://www.linkedin.com/in/marc-mayol-orell/)
