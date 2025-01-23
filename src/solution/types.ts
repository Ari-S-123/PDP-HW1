import type { PromptResult } from "./enums";

export type PromptFilters = {
  model?: string;
  version?: string;
  type?: string;
  result?: PromptResult;
};
