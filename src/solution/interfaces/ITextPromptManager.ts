import type ITextPrompt from "./ITextPrompt";
import type IPromptManager from "./IPromptManager";

/**
 * @Interface ITextPromptManager describing the duties of a text prompt manager.
 */
export default interface ITextPromptManager extends IPromptManager {
  /**
   * Gets text prompts that contain the search term.
   * @param {string} searchTerm The search term to look for.
   * @returns {ITextPrompt[]} The text prompts that contain the search term.
   */
  searchPrompts(searchTerm: string): ITextPrompt[];
}
