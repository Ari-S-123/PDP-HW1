import type IPromptManager from "../interfaces/IPromptManager";
import type IPrompt from "../interfaces/IPrompt";
import { SortOrder } from "../enums";
import type { PromptFilters } from "../types";
import { browser } from "$app/environment";

/**
 * A service for managing prompts. Uses local storage to persist data.
 */
export default class PromptStorageService implements IPromptManager {
  protected _prompts: IPrompt[] = [];
  protected _sortOrder: SortOrder = SortOrder.Ascending;
  private readonly STORAGE_KEY = "promptStorageService";

  constructor() {
    if (browser) {
      this.loadFromStorage();
    }
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      this._prompts = data.prompts;
      this._sortOrder = data.sortOrder;
    }
  }

  private saveToStorage(): void {
    const data = {
      prompts: this._prompts,
      sortOrder: this._sortOrder
    };

    if (browser) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
  }

  public get prompts(): IPrompt[] {
    return this._prompts;
  }

  public get sortOrder(): SortOrder {
    return this._sortOrder;
  }

  public set sortOrder(sortOrder: SortOrder) {
    if (!sortOrder) {
      throw new Error("A valid sort order must be provided.");
    }
    this._sortOrder = sortOrder;
    this.saveToStorage();
  }

  public addPrompt(prompt: IPrompt): void {
    this._prompts.push(prompt);
    this.saveToStorage();
  }

  public removePrompt(prompt: IPrompt): void {
    this._prompts = this._prompts.filter((p) => p !== prompt);
    this.saveToStorage();
  }

  public removePromptById(id: string): void {
    this._prompts = this._prompts.filter((p) => {
      // This shouldn't work but it does
      return p._id !== id;
    });
    this.saveToStorage();
  }

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

  public clearPrompts(): void {
    this._prompts = [];
    this.saveToStorage();
  }
}
