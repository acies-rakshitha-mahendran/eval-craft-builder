import type { CraftLayout } from "./types";
import { VAD_INPUT_CONFIGS } from "./vadInputs";

/**
 * Detect which VADs were selected in the VAD builder layout.
 * The VAD builder stores nodes as a serialized Craft.js JSON string; we look for
 * `VADBlock` props like `"title":"<VAD name>"`.
 */
export function detectSelectedVADsFromLayout(layout: CraftLayout): string[] {
  if (!layout || typeof layout !== "string") return [];

  const known = Object.keys(VAD_INPUT_CONFIGS);
  const selected: string[] = [];

  for (const name of known) {
    // Keep this intentionally simple/robust; the serialized JSON is stable and small.
    if (layout.includes(`"title":"${name}"`)) {
      selected.push(name);
    }
  }

  return selected;
}

