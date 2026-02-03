// src/present/ResultsPage.tsx
import React from "react";
import { Editor, Frame } from "@craftjs/core";
import { craftResolver } from "../builder/craft/craftResolver";
import type { CraftLayout, EvalResults } from "../types";

type Props = {
  results: EvalResults | null;
  layout: CraftLayout;
};

export const ResultsPage: React.FC<Props> = ({ results, layout }) => {
  if (!layout) {
    return (
      <div style={{ padding: 24, opacity: 0.8, fontSize: 13 }}>
        No results layout published yet. Go to the Results builder and design the layout, then save & publish.
      </div>
    );
  }

  const hasResults = !!results && Object.keys(results).length > 0;
  const keys = hasResults ? Object.keys(results as EvalResults) : [];

  return (
    <div className="present-body" style={{ padding: "1rem", gap: "1.25rem" }}>
      {/* Results layout built in the Results builder */}
      <div className="glass-card" style={{ padding: 0 }}>
        <Editor enabled={false} resolver={craftResolver}>
          <Frame data={layout} />
        </Editor>
      </div>

      {/* Numeric summary + debug view */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {hasResults ? (
          keys.slice(0, 4).map((key) => (
            <div key={key} className="glass-card" style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>{key}</div>
              <div style={{ fontSize: 24, fontWeight: 600 }}>
                {results && results[key].toFixed(2)}
              </div>
              <input
                type="range"
                min={0}
                max={200}
                defaultValue={results ? results[key] : 0}
                style={{ width: "100%" }}
              />
            </div>
          ))
        ) : (
          <div style={{ padding: 16, opacity: 0.8, fontSize: 13 }}>
            Run a calculation first to see numeric outputs alongside the designed layout.
          </div>
        )}
      </div>

      {hasResults && (
        <div style={{ marginTop: 4 }} className="glass-card">
          <div style={{ fontSize: 13, marginBottom: 8, opacity: 0.8 }}>
            Detailed result payload
          </div>
          <pre
            style={{
              fontSize: 11,
              color: "#9ca3af",
              whiteSpace: "pre-wrap",
            }}
          >
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
