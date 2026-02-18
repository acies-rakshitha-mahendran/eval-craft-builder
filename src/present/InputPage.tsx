import React from "react";
import { InputsRenderer } from "./InputsRenderer";
import type { VADInputValue } from "../evalContext";

type Props = {
  vadNames: string[]; 
  onCalculate: () => void;
  onInputsChange?: (inputs: VADInputValue) => void;
};

export const InputPage: React.FC<Props> = ({
  vadNames = [],
  onCalculate,
  onInputsChange,
}) => {
  return (
    <div
      className="present-body"
      style={{
        padding: "1.5rem",
        overflowY: "auto",
        maxHeight: "100%",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "18px", fontWeight: 600 }}>
          Enter Inputs
        </h2>
        <p
          style={{
            margin: "0",
            fontSize: "13px",
            marginBottom: "1.5rem",
            opacity: 0.8,
          }}
        >
          Provide the required inputs for the VADs selected in the previous step.
        </p>

        {vadNames && vadNames.length > 0 ? (
          <InputsRenderer vadNames={vadNames} onInputsChange={onInputsChange} />
        ) : (
          <div style={{ padding: "2rem", textAlign: "center", opacity: 0.8 }}>
            No VADs selected. Please go back and select VADs from the Input screen.
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "2rem" }}>
        <button
          className="glass-button"
          onClick={onCalculate}
          style={{
            padding: "0.5rem 1.5rem",
          }}
        >
          Calculate
        </button>
      </div>
    </div>
  );
};
