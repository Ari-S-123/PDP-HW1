import type IPrompt from "./IPrompt";
import type { PromptFilters, SortOn } from "../types";
import type { SortOrder } from "../enums";

/**
 * @Interface IPromptManager describing the duties of a prompt manager.
 */
export default interface IPromptManager {
  /**
   * Gets the prompts of the prompt manager.
   * @returns {IPrompt[]} The prompts of the prompt manager.
   */
  get prompts(): IPrompt[];

  /**
   * Gets the sort order of the prompt manager.
   * @returns {SortOrder} The sort order of the prompt manager.
   */
  get sortOrder(): SortOrder;

  /**
   * Sets the sort order of the prompt manager.
   * @param {SortOrder} sortOrder The sort order to set.
   */
  set sortOrder(sortOrder: SortOrder);

  /**
   * Sorts the prompts of the prompt manager.
   * @param {SortOn} sortOn The field to sort on.
   */
  sortPrompts(sortOn: SortOn): void;

  /**
   * Adds a prompt to the prompt manager.
   * @param {IPrompt} prompt The prompt to add.
   */
  addPrompt(prompt: IPrompt): void;

  /**
   * Removes a prompt from the prompt manager.
   * @param {IPrompt} prompt The prompt to remove.
   */
  removePrompt(prompt: IPrompt): void;

  /**
   * Removes a prompt from the prompt manager by its id.
   * @param {string} id The prompt id to remove.
   */
  removePromptById(id: string): void;

  /**
   * Gets the filtered prompts of the prompt manager.
   * @param {PromptFilters} filters The filters to apply.
   * @returns {IPrompt[]} The filtered prompts of the prompt manager.
   */
  getFilteredPrompts(filters: PromptFilters): IPrompt[];
}
