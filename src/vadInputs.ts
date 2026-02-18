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
        label: "Current Annual HVAC kWh Consumption",
        type: "number",
        placeholder: "e.g. 1020000",
        options: ["kWh", "Number"],
        defaultUOM: "kWh",
      },
    ],
  },

  "Reduced Maintenance Costs": {
    vadName: "Reduced Maintenance Costs",
    fields: [
      {
        label: "Cost of Current Maintenance Contract per year",
        type: "number",
        placeholder: "e.g. 12000",
        options: ["$", "Number"],
        defaultUOM: "$",
      },
    ],
  },

  "Increased Ticket Sales": {
    vadName: "Increased Ticket Sales",
    fields: [
      {
        label: "Annual Patrons",
        type: "number",
        placeholder: "e.g. 150000",
        options: ["Number"],
        defaultUOM: "Number",
      },
      {
        label: "Average Ticket Profit",
        type: "number",
        placeholder: "e.g. 12",
        options: ["$", "Number"],
        defaultUOM: "$",
      },
    ],
  },

  "Avoided Revenue Loss": {
    vadName: "Avoided Revenue Loss",
    fields: [
      {
        label: "Revenue per Show",
        type: "number",
        placeholder: "e.g. 18000",
        options: ["$", "Number"],
        defaultUOM: "$",
      },
      {
        label: "Number of At-Risk Shows Annually",
        type: "number",
        placeholder: "e.g. 52",
        options: ["Number"],
        defaultUOM: "Number",
      },
    ],
  },

  "Increased Recyclability": {
    vadName: "Increased Recyclability",
    fields: [
      {
        label: "Number of HVAC units required",
        type: "number",
        placeholder: "e.g. 10",
        options: ["Number"],
        defaultUOM: "Number",
      },
    ],
  },

  "Embodied Carbon Reduction": {
    vadName: "Embodied Carbon Reduction",
    fields: [
      {
        label: "Number of HVAC units required",
        type: "number",
        placeholder: "e.g. 10",
        options: ["Number"],
        defaultUOM: "Number",
      },
    ],
  },
};
