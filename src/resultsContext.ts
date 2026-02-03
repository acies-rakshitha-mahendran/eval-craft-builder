import React from "react";
import type { EvalResults } from "./types";

// Simple context to make numeric results available to Craft result components
export const ResultsContext = React.createContext<EvalResults | null>(null);

