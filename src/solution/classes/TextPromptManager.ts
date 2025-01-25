import type ITextPromptManager from "../interfaces/ITextPromptManager";
import type ITextPrompt from "../interfaces/ITextPrompt";
import PromptManager from "./PromptManager";

/**
 * @class Implementing the duties of a text prompt manager.
 */
export default class TextPromptManager extends PromptManager implements ITextPromptManager {
  protected _prompts: ITextPrompt[] = [];

  /**
   * Gets text prompts that contain the search term.
   * @param {string} searchTerm The search term to look for.
   * @returns {ITextPrompt[]} The text prompts that contain the search term.
   */
  public searchPrompts(searchTerm: string): ITextPrompt[] {
    return this._prompts.filter((prompt) =>
      Object.values(prompt).some((value) =>
        value.toString().toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
      )
    );
  }
}
