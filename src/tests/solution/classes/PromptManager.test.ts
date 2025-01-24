import { beforeEach, describe, expect, it } from "vitest";
import PromptManager from "../../../solution/classes/PromptManager";
import { SortOrder } from "../../../solution/enums";
import {
  DUMMY_MULTIMODAL_PROMPT_1,
  DUMMY_PROMPT_1,
  DUMMY_TEXT_PROMPT_1
} from "../../test-dummies/prompts";

describe("PromptManager Test Suite", () => {
  let testPromptManager: PromptManager;

  beforeEach(() => {
    testPromptManager = new PromptManager();
  });

  it("should create a PromptManager instance with default values", () => {
    expect(testPromptManager.prompts).toStrictEqual([]);
    expect(testPromptManager.sortOrder).toBe(SortOrder.Ascending);
  });

  it("should return correct values for setters", () => {
    expect(testPromptManager.sortOrder).toBe(SortOrder.Ascending);
    testPromptManager.sortOrder = SortOrder.Descending;
    expect(testPromptManager.sortOrder).toBe(SortOrder.Descending);
  });

  it("should add a prompt to the prompt manager correctly", () => {
    expect(testPromptManager.prompts).toStrictEqual([]);
    testPromptManager.addPrompt(DUMMY_TEXT_PROMPT_1);
    expect(testPromptManager.prompts).toContain(DUMMY_TEXT_PROMPT_1);
  });

  // The following tests were generated using GitHub Copilot with some human modifications.

  it("should remove a prompt from the prompt manager correctly", () => {
    testPromptManager.addPrompt(DUMMY_TEXT_PROMPT_1);
    expect(testPromptManager.prompts).toContain(DUMMY_TEXT_PROMPT_1);
    testPromptManager.removePrompt(DUMMY_TEXT_PROMPT_1);
    expect(testPromptManager.prompts).toStrictEqual([]);
  });

  it("should remove a prompt by id from the prompt manager correctly", () => {
    testPromptManager.addPrompt(DUMMY_TEXT_PROMPT_1);
    expect(testPromptManager.prompts).toContain(DUMMY_TEXT_PROMPT_1);
    testPromptManager.removePromptById(DUMMY_TEXT_PROMPT_1.id);
    expect(testPromptManager.prompts).toStrictEqual([]);
  });

  it("should filter prompts correctly", () => {
    testPromptManager.addPrompt(DUMMY_TEXT_PROMPT_1);
    testPromptManager.addPrompt(DUMMY_MULTIMODAL_PROMPT_1);
    expect(testPromptManager.prompts).toContain(DUMMY_TEXT_PROMPT_1);
    expect(testPromptManager.prompts).toContain(DUMMY_MULTIMODAL_PROMPT_1);
    const filteredPrompts = testPromptManager.getFilteredPrompts({ type: DUMMY_PROMPT_1.type });
    expect(filteredPrompts).toContain(DUMMY_TEXT_PROMPT_1);
    expect(filteredPrompts).not.toContain(DUMMY_MULTIMODAL_PROMPT_1);
  });

  it("should sort prompts correctly", () => {
    testPromptManager.addPrompt(DUMMY_TEXT_PROMPT_1);
    testPromptManager.addPrompt(DUMMY_MULTIMODAL_PROMPT_1);
    expect(testPromptManager.prompts[0]).toBe(DUMMY_TEXT_PROMPT_1);
    expect(testPromptManager.prompts[1]).toBe(DUMMY_MULTIMODAL_PROMPT_1);
    testPromptManager.sortPrompts("type");
    expect(testPromptManager.prompts[0]).toBe(DUMMY_MULTIMODAL_PROMPT_1);
    expect(testPromptManager.prompts[1]).toBe(DUMMY_TEXT_PROMPT_1);
  });
});
