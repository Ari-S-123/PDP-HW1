export type PromptFilters = {
  model?: string;
  version?: string;
  type?: string;
  result?: string;
};

export type SortOn = "id" | "model" | "version" | "type" | "date" | "result";
