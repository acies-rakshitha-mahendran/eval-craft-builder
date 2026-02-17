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
  "Reduced Maintenance Cost": {
    vadName: "Reduced Maintenance Cost",
    fields: [
      {
        label: "cost_of_current_maintenance_contract_per_year",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "$",
      },
      {
        label: "cost_of_uahu_predictive_maintenance_plan_per_year",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "$",
      },
    ],
  },
  "Avoided Revenue Loss": {
    vadName: "Avoided Revenue Loss",
    fields: [
      {
        label: "revenue_per_show",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "$",
      },
      {
        label: "no_of_at_risk_shows_annually",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "Number",
      },
      {
        label: "reduced_probability_of_failure",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "%",
      },
    ],
  },
  "Increased Ticket Sales": {
    vadName: "Increased Ticket Sales",
    fields: [
      {
        label: "no_of_annual_patrons",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "Number",
      },
      {
        label: "projected_patronage_increase",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "%",
      },
      {
        label: "average_ticket_profit",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "$",
      },
    ],
  },
  "Increased Recyclability": {
    vadName: "Increased Recyclability",
    fields: [
      {
        label: "no_of_hvac_units_required",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "Number",
      },
      {
        label: "uahu_recyclability_rate",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "%",
      },
      {
        label: "average_recyclability_rate",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "%",
      },
      {
        label: "cost_saved_by_recyclability",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "$",
      },
    ],
  },
  "Cost Consumption": {
    vadName: "Cost Consumption",
    fields: [
      {
        label: "numbers",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "Number",
      },
    ],
  },
  "Embodied Carbon Reduction": {
    vadName: "Embodied Carbon Reduction",
    fields: [
      {
        label: "no_of_hvac_units_required",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "Number",
      },
      {
        label: "hvac_average_emissions",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "Number",
      },
      {
        label: "uahu_emission_reduction_rate",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "%",
      },
      {
        label: "carbon_credit_tax_cost",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "$",
      },
    ],
  },
  "Reduced Electricity Consumption": {
    vadName: "Reduced Electricity Consumption",
    fields: [
      {
        label: "current_annual_hvac_electricity_consumption",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "kWh",
      },
      {
        label: "uahu_energy_reduction_percentage",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "%",
      },
      {
        label: "electricity_cost_per_kwh",
        type: "number",
        placeholder: "Enter value",
        options: ["$", "Number", "%", "kWh"],
        defaultUOM: "$",
      },
    ],
  },
};
