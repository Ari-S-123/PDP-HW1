import type { PromptResult } from "./enums";

export type PromptFilters = {
  model?: string;
  version?: string;
  type?: string;
  result?: PromptResult;
};

export type SortOn = "id" | "model" | "version" | "type" | "date" | "result";
