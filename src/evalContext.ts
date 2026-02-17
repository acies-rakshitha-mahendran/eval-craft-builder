import React from "react";

export type VADFieldInput = {
  value: string | number;
  uom: string;
};

// Raw inputs keyed by VAD title and field index (matches `present/InputsRenderer.tsx`)
export type VADInputValue = {
  [vadName: string]: {
    [fieldIndex: number]: VADFieldInput;
  };
};

export type EvalContextValue = {
  selectedVADs: string[];
  inputs: VADInputValue | null;
};

export const EvalContext = React.createContext<EvalContextValue>({
  selectedVADs: [],
  inputs: null,
});

