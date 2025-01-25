import { beforeEach, describe, expect, it } from "vitest";
import { SortOrder } from "../../../solution/enums";
import {
  DUMMY_MULTIMODAL_PROMPT_1,
  DUMMY_MULTIMODAL_PROMPT_2,
  DUMMY_PROMPT_1,
  DUMMY_TEXT_PROMPT_1
} from "../../test-dummies/prompts";
import TextPromptManager from "../../../solution/classes/TextPromptManager";

describe("TextPromptManager Test Suite", () => {
  let testTextPromptManager: TextPromptManager;

  beforeEach(() => {
    testTextPromptManager = new TextPromptManager();
  });

  it("should create a PromptManager instance with default values", () => {
    expect(testTextPromptManager.prompts).toStrictEqual([]);
    expect(testTextPromptManager.sortOrder).toBe(SortOrder.Ascending);
  });

  it("should return correct values for setters", () => {
    expect(testTextPromptManager.sortOrder).toBe(SortOrder.Ascending);
    testTextPromptManager.sortOrder = SortOrder.Descending;
    expect(testTextPromptManager.sortOrder).toBe(SortOrder.Descending);
  });

  it("should add a prompt to the prompt manager correctly", () => {
    expect(testTextPromptManager.prompts).toStrictEqual([]);
    testTextPromptManager.addPrompt(DUMMY_TEXT_PROMPT_1);
    expect(testTextPromptManager.prompts).toContain(DUMMY_TEXT_PROMPT_1);
  });

  // The following tests were generated using GitHub Copilot with some human modifications.

  it("should remove a prompt from the prompt manager correctly", () => {
    testTextPromptManager.addPrompt(DUMMY_TEXT_PROMPT_1);
    expect(testTextPromptManager.prompts).toContain(DUMMY_TEXT_PROMPT_1);
    testTextPromptManager.removePrompt(DUMMY_TEXT_PROMPT_1);
    expect(testTextPromptManager.prompts).toStrictEqual([]);
  });

  it("should remove a prompt by id from the prompt manager correctly", () => {
    testTextPromptManager.addPrompt(DUMMY_TEXT_PROMPT_1);
    expect(testTextPromptManager.prompts).toContain(DUMMY_TEXT_PROMPT_1);
    testTextPromptManager.removePromptById(DUMMY_TEXT_PROMPT_1.id);
    expect(testTextPromptManager.prompts).toStrictEqual([]);
  });

  it("should filter prompts correctly", () => {
    testTextPromptManager.addPrompt(DUMMY_TEXT_PROMPT_1);
    testTextPromptManager.addPrompt(DUMMY_MULTIMODAL_PROMPT_1);
    expect(testTextPromptManager.prompts).toContain(DUMMY_TEXT_PROMPT_1);
    expect(testTextPromptManager.prompts).toContain(DUMMY_MULTIMODAL_PROMPT_1);
    const filteredPrompts = testTextPromptManager.getFilteredPrompts({ type: DUMMY_PROMPT_1.type });
    expect(filteredPrompts).toContain(DUMMY_TEXT_PROMPT_1);
    expect(filteredPrompts).not.toContain(DUMMY_MULTIMODAL_PROMPT_1);
  });

  it("should sort prompts correctly", () => {
    testTextPromptManager.addPrompt(DUMMY_TEXT_PROMPT_1);
    testTextPromptManager.addPrompt(DUMMY_MULTIMODAL_PROMPT_1);
    expect(testTextPromptManager.prompts[0]).toBe(DUMMY_TEXT_PROMPT_1);
    expect(testTextPromptManager.prompts[1]).toBe(DUMMY_MULTIMODAL_PROMPT_1);
    testTextPromptManager.sortPrompts("type");
    expect(testTextPromptManager.prompts[0]).toBe(DUMMY_MULTIMODAL_PROMPT_1);
    expect(testTextPromptManager.prompts[1]).toBe(DUMMY_TEXT_PROMPT_1);
  });

  // The following tests were generated using GitHub Copilot with some human modifications.

  it("should search through prompts correctly", () => {
    testTextPromptManager.addPrompt(DUMMY_TEXT_PROMPT_1);
    testTextPromptManager.addPrompt(DUMMY_MULTIMODAL_PROMPT_1);
    testTextPromptManager.addPrompt(DUMMY_MULTIMODAL_PROMPT_2);
    expect(testTextPromptManager.prompts).toContain(DUMMY_TEXT_PROMPT_1);
    expect(testTextPromptManager.prompts).toContain(DUMMY_MULTIMODAL_PROMPT_1);
    expect(testTextPromptManager.prompts).toContain(DUMMY_MULTIMODAL_PROMPT_2);

    const searchTerm = DUMMY_TEXT_PROMPT_1.model;
    const searchResults = testTextPromptManager.searchPrompts(searchTerm);
    expect(searchResults).toContain(DUMMY_TEXT_PROMPT_1);
    expect(searchResults).toContain(DUMMY_MULTIMODAL_PROMPT_1);
    expect(searchResults).not.toContain(DUMMY_MULTIMODAL_PROMPT_2);

    const searchTerm2 = DUMMY_TEXT_PROMPT_1.input.split(" ")[0];
    const searchResults2 = testTextPromptManager.searchPrompts(searchTerm2);
    expect(searchResults2).toContain(DUMMY_TEXT_PROMPT_1);
    expect(searchResults2).toContain(DUMMY_MULTIMODAL_PROMPT_1);
    expect(searchResults2).toContain(DUMMY_MULTIMODAL_PROMPT_2);
  });
});
