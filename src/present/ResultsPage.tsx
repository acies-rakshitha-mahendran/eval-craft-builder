import React from "react";
import { Editor, Frame } from "@craftjs/core";
import { craftResolver } from "../builder/craft/craftResolver";
import type { CraftLayout, EvalResults } from "../types";
import { ResultsContext } from "../resultsContext";
import { EvalContext, type VADInputValue } from "../evalContext";
import { VADResultsCards } from "../builder/craft/craftNodes";
import { VAD_INPUT_CONFIGS } from "../vadInputs";

type Props = {
  results: EvalResults | null;
  layout: CraftLayout;
  selectedVADs: string[];
  inputs: VADInputValue;
};

export const ResultsPage: React.FC<Props> = ({ results, layout, selectedVADs, inputs }) => {
  const [weightedIncrease, setWeightedIncrease] = React.useState(0);
  const [selectedVad, setSelectedVad] = React.useState<string>("");
  const [selectedFieldIndex, setSelectedFieldIndex] = React.useState<number | null>(null);

  const multiplier = 1 + weightedIncrease / 100;

  const effectiveResults: EvalResults | null = React.useMemo(() => {
    if (!results) return null;
    if (weightedIncrease === 0) return results;
    const scaled: EvalResults = {};
    Object.entries(results).forEach(([key, value]) => {
      scaled[key] = value * multiplier;
    });
    return scaled;
  }, [results, multiplier, weightedIncrease]);

  if (!layout) {
    return (
      <div style={{ padding: 24, opacity: 0.8, fontSize: 13 }}>
        No results layout published yet. Go to the Results builder and design the layout, then save & publish.
      </div>
    );
  }

  const layoutHasDynamicVADCards = typeof layout === "string" && layout.includes("VADResultsList");

  const vadOptions = selectedVADs && selectedVADs.length > 0 ? selectedVADs : Object.keys(VAD_INPUT_CONFIGS);
  const fieldOptions =
    selectedVad && VAD_INPUT_CONFIGS[selectedVad] ? VAD_INPUT_CONFIGS[selectedVad].fields : [];

  return (
    <div
      className="present-body"
      style={{
        padding: "1rem",
        gap: "1.25rem",
        overflowY: "auto",
      }}
    >
      <div
        className="glass-card"
        style={{
          background: "rgba(220, 252, 231, 0.6)",
          borderColor: "rgba(34, 197, 94, 0.35)",
          padding: "1rem 1.25rem 1.25rem 1.25rem",
        }}
      >
        <div style={{ marginBottom: "0.5rem" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Dynamic Results Modeling</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>
            Use the slider to apply a weighted increase (0%–100%) and see how the results change in real time.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 12,
            marginBottom: 6,
          }}
        >
          <span>
            Weighted Increase:{" "}
            <span style={{ fontWeight: 600 }}>{weightedIncrease}%</span>
          </span>
          <span style={{ color: "#16a34a", fontWeight: 600 }}>
            Multiplier: {multiplier.toFixed(2)}x
          </span>
        </div>

        <div style={{ marginBottom: 8 }}>
          <input
            type="range"
            min={0}
            max={100}
            value={weightedIncrease}
            onChange={(e) => setWeightedIncrease(parseInt(e.target.value, 10) || 0)}
            style={{
              width: "100%",
              height: 6,
              borderRadius: 999,
              appearance: "none",
              background:
                "linear-gradient(to right, #16a34a 0%, #16a34a " +
                weightedIncrease +
                "%, rgba(209,213,219,1) " +
                weightedIncrease +
                "%, rgba(209,213,219,1) 100%)",
              outline: "none",
              cursor: "pointer",
            }}
          />
          <div
            style={{
              fontSize: 11,
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
              opacity: 0.75,
            }}
          >
            <span>0% (Base)</span>
            <span>50%</span>
            <span>100% (2x)</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 10,
            flexWrap: "wrap",
            fontSize: 12,
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <label
              style={{
                display: "block",
                fontSize: 11,
                marginBottom: 4,
                opacity: 0.75,
              }}
            >
              Value Driver
            </label>
            <select
              value={selectedVad}
              onChange={(e) => {
                setSelectedVad(e.target.value);
                setSelectedFieldIndex(null);
              }}
              style={{
                width: "100%",
                padding: "0.4rem 0.5rem",
                borderRadius: 8,
                fontSize: 12,
              }}
            >
              <option value="">Select a VAD</option>
              {vadOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ minWidth: 0, flex: 1 }}>
            <label
              style={{
                display: "block",
                fontSize: 11,
                marginBottom: 4,
                opacity: 0.75,
              }}
            >
              Variable
            </label>
            <select
              value={selectedFieldIndex != null ? String(selectedFieldIndex) : ""}
              onChange={(e) => {
                const v = e.target.value;
                setSelectedFieldIndex(v === "" ? null : parseInt(v, 10));
              }}
              style={{
                width: "100%",
                padding: "0.4rem 0.5rem",
                borderRadius: 8,
                fontSize: 12,
              }}
              disabled={!selectedVad}
            >
              <option value="">
                {selectedVad ? "Select a variable" : "Select a VAD first"}
              </option>
              {selectedVad &&
                fieldOptions.map((field, idx) => (
                  <option key={field.label} value={idx}>
                    {field.label}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0 }}>
        <ResultsContext.Provider value={effectiveResults ?? results}>
          <EvalContext.Provider value={{ selectedVADs, inputs }}>
            <Editor enabled={false} resolver={craftResolver}>
              <Frame data={layout} />
            </Editor>

            {!layoutHasDynamicVADCards && (
              <div style={{ padding: "0 0.75rem 0.75rem 0.75rem" }}>
                <VADResultsCards columns={2} />
              </div>
            )}
          </EvalContext.Provider>
        </ResultsContext.Provider>
      </div>
    </div>
  );
};
