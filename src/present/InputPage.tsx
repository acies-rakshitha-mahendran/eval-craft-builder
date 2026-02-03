// src/present/InputPage.tsx
import React from "react";
import { InputsRenderer } from "./InputsRenderer";

type Props = {
  vadNames: string[]; // Array of VAD names from build layout
  onCalculate: () => void;
};

export const InputPage: React.FC<Props> = ({
  vadNames = [],
  onCalculate,
}) => {
  return (
    <div className="present-body" style={{ padding: "1.5rem" }}>
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
          <InputsRenderer
            vadNames={vadNames}
          />
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
