import type IPromptManager from "../interfaces/IPromptManager";
import type IPrompt from "../interfaces/IPrompt";
import { SortOrder } from "../enums";
import type { PromptFilters } from "../types";

export default class PromptManager implements IPromptManager {
  protected _prompts: IPrompt[] = [];
  protected _sortOrder: SortOrder = SortOrder.Ascending;

  /**
   * Gets the prompts of the prompt manager.
   * @returns {IPrompt[]} The prompts of the prompt manager.
   */
  public get prompts(): IPrompt[] {
    return this._prompts;
  }

  /**
   * Gets the sort order of the prompt manager.
   * @returns {SortOrder} The sort order of the prompt manager.
   */
  public get sortOrder(): SortOrder {
    return this._sortOrder;
  }

  /**
   * Sets the sort order of the prompt manager.
   * @param {SortOrder} sortOrder The sort order to set.
   * @throws {Error} A valid sort order must be provided.
   */
  public set sortOrder(sortOrder: SortOrder) {
    if (!sortOrder) {
      throw new Error("A valid sort order must be provided.");
    }
    this._sortOrder = sortOrder;
  }

  /**
   * Adds a prompt to the prompt manager.
   * @param {IPrompt} prompt The prompt to add.
   */
  public addPrompt(prompt: IPrompt): void {
    this._prompts.push(prompt);
  }

  /**
   * Removes a prompt from the prompt manager.
   * @param {IPrompt} prompt The prompt to remove.
   */
  public removePrompt(prompt: IPrompt): void {
    this._prompts = this._prompts.filter((p) => p !== prompt);
  }

  /**
   * Removes a prompt from the prompt manager by its id.
   * @param {string} id The prompt id to remove.
   */
  public removePromptById(id: string): void {
    this._prompts = this._prompts.filter((p) => p.id !== id);
  }

  /**
   * Gets the filtered prompts of the prompt manager.
   * @param {PromptFilters} filters The filters to apply.
   * @returns {IPrompt[]} The filtered prompts of the prompt manager.
   */
  public getFilteredPrompts(filters: PromptFilters): IPrompt[] {
    return this._prompts.filter((prompt) => {
      return (
        (!filters.model || prompt.model === filters.model) &&
        (!filters.version || prompt.version === filters.version) &&
        (!filters.type || prompt.type === filters.type) &&
        (!filters.result || prompt.result === filters.result)
      );
    });
  }
}
