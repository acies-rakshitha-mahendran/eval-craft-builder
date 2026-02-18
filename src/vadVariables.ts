export interface VADVariable {
  label: string;
  defaultValue: number;
  defaultUOM: string;
  isUserInput: boolean;
  inputFieldIndex?: number;
}

export const VAD_VARIABLES: Record<string, VADVariable[]> = {
  "Reduced Electricity Consumption": [
    {
      label: "Current Annual HVAC kWh Consumption",
      defaultValue: 1020000,
      defaultUOM: "kWh",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "UAHU Energy Reduction Percentage",
      defaultValue: 50,
      defaultUOM: "%",
      isUserInput: false,
    },
    {
      label: "Cost per kWh",
      defaultValue: 0.15,
      defaultUOM: "$",
      isUserInput: false,
    },
  ],

  "Reduced Maintenance Costs": [
    {
      label: "Cost of Current Maintenance Contract per year",
      defaultValue: 12000,
      defaultUOM: "$",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "Cost of UAHU Predictive Maintenance Plan per year",
      defaultValue: 5000,
      defaultUOM: "$",
      isUserInput: false,
    },
  ],

  "Increased Ticket Sales": [
    {
      label: "Annual Patrons",
      defaultValue: 150000,
      defaultUOM: "Number",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "Projected Patronage Increase %",
      defaultValue: 1,
      defaultUOM: "%",
      isUserInput: false,
    },
    {
      label: "Average Ticket Profit",
      defaultValue: 12,
      defaultUOM: "$",
      isUserInput: true,
      inputFieldIndex: 1,
    },
  ],

  "Avoided Revenue Loss": [
    {
      label: "Revenue per Show",
      defaultValue: 18000,
      defaultUOM: "$",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "Number of At-Risk Shows Annually",
      defaultValue: 52,
      defaultUOM: "Number",
      isUserInput: true,
      inputFieldIndex: 1,
    },
    {
      label: "Average show failure probability",
      defaultValue: 3,
      defaultUOM: "%",
      isUserInput: false,
    },
    {
      label: "UAHU show failure probability",
      defaultValue: 1,
      defaultUOM: "%",
      isUserInput: false,
    },
  ],

  "Increased Recyclability": [
    {
      label: "Number of HVAC units required",
      defaultValue: 10,
      defaultUOM: "Number",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "Average Recyclability rate",
      defaultValue: 40,
      defaultUOM: "%",
      isUserInput: false,
    },
    {
      label: "Recyclability rate of UAHU",
      defaultValue: 60,
      defaultUOM: "%",
      isUserInput: false,
    },
    {
      label: "Cost saved by recyclability",
      defaultValue: 5000,
      defaultUOM: "$",
      isUserInput: false,
    },
  ],

  "Embodied Carbon Reduction": [
    {
      label: "Number of HVAC units required",
      defaultValue: 10,
      defaultUOM: "Number",
      isUserInput: true,
      inputFieldIndex: 0,
    },
    {
      label: "Average emissions of HVAC",
      defaultValue: 5000,
      defaultUOM: "kgCO2e",
      isUserInput: false,
    },
    {
      label: "Emission reduction rate of UAHU",
      defaultValue: 30,
      defaultUOM: "%",
      isUserInput: false,
    },
    {
      label: "Emissions reduced",
      defaultValue: 1500,
      defaultUOM: "kgCO2e",
      isUserInput: false,
    },
    {
      label: "Cost of Carbon (Tax or Credit price)",
      defaultValue: 0.08,
      defaultUOM: "$",
      isUserInput: false,
    },
  ],
};

