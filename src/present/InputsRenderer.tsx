// src/present/InputsRenderer.tsx
import React, { useState } from "react";
import { VAD_INPUT_CONFIGS } from "../vadInputs";

interface VADInputValue {
  [vadName: string]: {
    [fieldIndex: number]: {
      value: string | number;
      uom: string;
    };
  };
}

interface InputsRendererProps {
  vadNames: string[]; // List of VAD names to render
  onInputsChange?: (inputs: VADInputValue) => void;
}

export const InputsRenderer: React.FC<InputsRendererProps> = ({ vadNames, onInputsChange }) => {
  const [inputs, setInputs] = useState<VADInputValue>(
    vadNames.reduce((acc, vadName) => {
      acc[vadName] = {};
      const config = VAD_INPUT_CONFIGS[vadName];
      if (config) {
        config.fields.forEach((field, idx) => {
          acc[vadName][idx] = {
            value: "",
            uom: field.defaultUOM || "$",
          };
        });
      }
      return acc;
    }, {} as VADInputValue)
  );

  const handleValueChange = (vadName: string, fieldIndex: number, value: string | number) => {
    const updated = { ...inputs };
    updated[vadName][fieldIndex].value = value;
    setInputs(updated);
    onInputsChange?.(updated);
  };

  const handleUOMChange = (vadName: string, fieldIndex: number, uom: string) => {
    const updated = { ...inputs };
    updated[vadName][fieldIndex].uom = uom;
    setInputs(updated);
    onInputsChange?.(updated);
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "6px",
    fontSize: "13px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  } as const;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {vadNames.map((vadName) => {
        const config = VAD_INPUT_CONFIGS[vadName];
        if (!config) return null;

        return (
          <div key={vadName} className="glass-card" style={{ padding: "1rem 1.25rem" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "0.75rem", color: "#55883B" }}>
              {vadName}
            </div>

            {config.fields.map((field, fieldIndex) => (
              <div key={`${vadName}-${fieldIndex}`} style={{ marginBottom: "0.9rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    marginBottom: "0.35rem",
                    fontWeight: 500,
                  }}
                >
                  {field.label}
                </label>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: "0.75rem",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="number"
                    placeholder={field.placeholder}
                    value={inputs[vadName]?.[fieldIndex]?.value || ""}
                    onChange={(e) => handleValueChange(vadName, fieldIndex, e.target.value)}
                    style={{
                      ...inputStyle,
                      flex: 1,
                    }}
                  />

                  {field.options && (
                    <select
                      value={inputs[vadName]?.[fieldIndex]?.uom || field.defaultUOM || "$"}
                      onChange={(e) => handleUOMChange(vadName, fieldIndex, e.target.value)}
                      style={{
                        ...inputStyle,
                        flex: 1,
                      }}
                    >
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
