// src/vadInputs.ts
export type InputFieldType = "number" | "text" | "dropdown";

export interface InputField {
  label: string;
  type: InputFieldType;
  placeholder?: string;
  options?: string[];
  defaultUOM?: string;
}

export interface VADInputConfig {
  vadName: string;
  fields: InputField[];
}

export const VAD_INPUT_CONFIGS: Record<string, VADInputConfig> = {
  "Reduced Electricity Consumption": {
    vadName: "Reduced Electricity Consumption",
    fields: [
      {
        label: "Current annual electricity consumption",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "kWh",
      },
    ],
  },
  "Reduced Maintenance Cost": {
    vadName: "Reduced Maintenance Cost",
    fields: [
      {
        label: "Cost of current maintenance contract per year",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "$",
      },
    ],
  },
  "Increased Ticket Sales": {
    vadName: "Increased Ticket Sales",
    fields: [
      {
        label: "Annual patrons",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "Number",
      },
    ],
  },
  "Avoided Revenue Loss": {
    vadName: "Avoided Revenue Loss",
    fields: [
      {
        label: "Revenue per show",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "$",
      },
      {
        label: "No. of at-risk shows annually",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "Number",
      },
    ],
  },
  "Increase in Recyclability": {
    vadName: "Increase in Recyclability",
    fields: [
      {
        label: "No. of HVAC units required",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "Number",
      },
    ],
  },
  "Lower Material Input Emissions": {
    vadName: "Lower Material Input Emissions",
    fields: [
      {
        label: "No. of HVAC units required",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "Number",
      },
    ],
  },
};
