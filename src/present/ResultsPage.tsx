// src/present/ResultsPage.tsx
import React from "react";
import { Editor, Frame } from "@craftjs/core";
import { craftResolver } from "../builder/craft/craftResolver";
import type { CraftLayout, EvalResults } from "../types";
import { ResultsContext } from "../resultsContext";
import { EvalContext, type VADInputValue } from "../evalContext";
import { VADResultsCards } from "../builder/craft/craftNodes";

type Props = {
  results: EvalResults | null;
  layout: CraftLayout;
  selectedVADs: string[];
  inputs: VADInputValue;
};

export const ResultsPage: React.FC<Props> = ({ results, layout, selectedVADs, inputs }) => {
  if (!layout) {
    return (
      <div style={{ padding: 24, opacity: 0.8, fontSize: 13 }}>
        No results layout published yet. Go to the Results builder and design the layout, then save & publish.
      </div>
    );
  }

  const layoutHasDynamicVADCards = typeof layout === "string" && layout.includes("VADResultsList");

  return (
    <div
      className="present-body"
      style={{
        padding: "1rem",
        gap: "1.25rem",
        overflowY: "auto",
      }}
    >
      {/* Results layout built in the Results builder, with live selection + inputs + numeric results injected via context */}
      <div className="glass-card" style={{ padding: 0 }}>
        <ResultsContext.Provider value={results}>
          <EvalContext.Provider value={{ selectedVADs, inputs }}>
            <Editor enabled={false} resolver={craftResolver}>
              <Frame data={layout} />
            </Editor>

            {/* Seamless fallback for older published layouts (ensures selected VAD cards still show) */}
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
