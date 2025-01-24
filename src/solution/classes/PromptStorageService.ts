import type IPromptManager from "../interfaces/IPromptManager";
import type IPrompt from "../interfaces/IPrompt";
import { SortOrder } from "../enums";
import type { PromptFilters } from "../types";
import { browser } from "$app/environment";

/**
 * @class Implementing the duties of a prompt manager using the localStorage API.
 * I didn't write the tests for this class because I would have to mock the localStorage API.
 */
export default class PromptStorageService implements IPromptManager {
  protected _prompts: IPrompt[] = [];
  protected _sortOrder: SortOrder = SortOrder.Ascending;
  private readonly STORAGE_KEY = "promptStorageService";

  /**
   * @constructor Initializes the prompt manager by loading the prompts from the localStorage.
   */
  constructor() {
    if (browser) {
      this.loadFromStorage();
    }
  }

  /**
   * Loads the prompts from the localStorage.
   * @private This method is only called in the constructor.
   */
  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      this._prompts = data.prompts;
      this._sortOrder = data.sortOrder;
    }
  }

  /**
   * Saves the prompts to the localStorage.
   * @private This method is called whenever the prompts are modified.
   */
  private saveToStorage(): void {
    const data = {
      prompts: this._prompts,
      sortOrder: this._sortOrder
    };

    if (browser) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
  }

  /**
   * Gets the prompts stored in the localStorage.
   * @returns {IPrompt[]} The prompts stored in the localStorage.
   */
  public get prompts(): IPrompt[] {
    return this._prompts;
  }

  /**
   * Gets the sort order of the prompts.
   * @returns {SortOrder} The sort order of the prompts.
   */
  public get sortOrder(): SortOrder {
    return this._sortOrder;
  }

  /**
   * Sets the sort order of the prompts.
   * @param {SortOrder} sortOrder The sort order to set.
   */
  public set sortOrder(sortOrder: SortOrder) {
    if (!sortOrder) {
      throw new Error("A valid sort order must be provided.");
    }
    this._sortOrder = sortOrder;
    this.saveToStorage();
  }

  /**
   * Adds a prompt to the prompt manager.
   * @param {IPrompt} prompt The prompt to add.
   */
  public addPrompt(prompt: IPrompt): void {
    this._prompts.push(prompt);
    this.saveToStorage();
  }

  /**
   * Removes a prompt from the prompt manager.
   * @param {IPrompt} prompt The prompt to remove.
   */
  public removePrompt(prompt: IPrompt): void {
    this._prompts = this._prompts.filter((p) => p !== prompt);
    this.saveToStorage();
  }

  /**
   * Removes a prompt from the prompt manager by id.
   * @param {string} id The id of the prompt to remove.
   */
  public removePromptById(id: string): void {
    this._prompts = this._prompts.filter((p) => {
      // This shouldn't work, but it does
      // TypeScript complains about this but there are no errors during runtime
      return p._id !== id;
    });
    this.saveToStorage();
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

  /**
   * Clears all the prompts from the prompt manager.
   */
  public clearPrompts(): void {
    this._prompts = [];
    this.saveToStorage();
  }
}
