import Prompt from "../../solution/classes/Prompt";
import TextPrompt from "../../solution/classes/TextPrompt";
import MultiModalPrompt from "../../solution/classes/MultiModalPrompt";
import { PromptResult } from "../../solution/enums";
import { DUMMY_ATTACHMENT_1, DUMMY_ATTACHMENT_2 } from "./attachments";

export const DUMMY_PROMPT_1 = new Prompt(
  "Claude",
  "Sonnet 3.5",
  "Text-to-Text",
  new Date("2025-01-23"),
  PromptResult.Success
);

export const DUMMY_TEXT_PROMPT_1 = new TextPrompt(
  "Claude",
  "Sonnet 3.5",
  "Text-to-Text",
  new Date("2025-01-23"),
  PromptResult.Success,
  "Roses are red.",
  "Violets are blue."
);

export const DUMMY_MULTIMODAL_PROMPT_1 = new MultiModalPrompt(
  "Claude",
  "Sonnet 3.5",
  "Text-to-Image",
  new Date("2025-01-23"),
  PromptResult.Success,
  "Generate an image of red roses.",
  "Sure!",
  [DUMMY_ATTACHMENT_1]
);

export const DUMMY_MULTIMODAL_PROMPT_2 = new MultiModalPrompt(
  "Claude",
  "Sonnet 3.5",
  "Text-to-Image",
  new Date("2025-01-23"),
  PromptResult.Success,
  "Generate an image of red roses.",
  "Sure!",
  [DUMMY_ATTACHMENT_1, DUMMY_ATTACHMENT_2]
);
