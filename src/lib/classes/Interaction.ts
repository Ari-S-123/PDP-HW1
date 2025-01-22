import type { IInteraction } from "$lib/interfaces/IInteraction";
import type { IModel } from "$lib/interfaces/IModel";
import type { IFile } from "$lib/interfaces/IFile";

export class Interaction implements IInteraction {
  private readonly _id: string;
  private _date: Date;
  private _model: IModel;
  private _prompt: string;
  private _response: string;
  private _inputFiles: IFile[];
  private _outputFiles: IFile[];
  private _succeeded: boolean;

  /**
   * Creates an instance of an Interaction.
   * @param {string} id - The id of the interaction
   * @param {Date} date - The date of the interaction
   * @param {IModel} model - The model associated with the interaction
   * @param {string} prompt - The prompt of the interaction
   * @param {string} response - The response of the interaction
   * @param {IFile[]} inputFiles - The input files of the interaction
   * @param {IFile[]} outputFiles - The output files of the interaction
   * @param {boolean} succeeded - Whether the interaction succeeded
   */
  constructor(
    id: string,
    date: Date,
    model: IModel,
    prompt: string,
    response: string,
    inputFiles: IFile[],
    outputFiles: IFile[],
    succeeded: boolean
  ) {
    this._id = id;
    this._date = date;
    this._model = model;
    this._prompt = prompt;
    this._response = response;
    this._inputFiles = inputFiles;
    this._outputFiles = outputFiles;
    this._succeeded = succeeded;
  }

  /**
   * Get the id of this interaction.
   * @returns {string} The id of this interaction.
   */
  get id(): string {
    return this._id;
  }

  /**
   * Get the date of this interaction.
   * @returns {Date} The date of this interaction.
   */
  get date(): Date {
    return this._date;
  }

  /**
   * Get the model associated with this interaction.
   * @returns {IModel} The model associated with this interaction.
   */
  get model(): IModel {
    return this._model;
  }

  /**
   * Get the prompt of this interaction.
   * @returns {string} The prompt of this interaction.
   */
  get prompt(): string {
    return this._prompt;
  }

  /**
   * Get the response of this interaction.
   * @returns {string} The response of this interaction.
   */
  get response(): string {
    return this._response;
  }

  /**
   * Get the input files of this interaction.
   * @returns {IFile[]} The input files of this interaction.
   */
  get inputFiles(): IFile[] {
    return this._inputFiles;
  }

  /**
   * Get the output files of this interaction.
   * @returns {IFile[]} The output files of this interaction.
   */
  get outputFiles(): IFile[] {
    return this._outputFiles;
  }

  /**
   * Get whether this interaction succeeded or not.
   * @returns {boolean} Whether this interaction succeeded
   */
  get succeeded(): boolean {
    return this._succeeded;
  }

  /**
   * Set the date of this interaction.
   * @param {Date} date The date of this interaction.
   */
  set date(date: Date) {
    this._date = date;
  }

  /**
   * Set the model associated with this interaction.
   * @param {IModel} model The model associated with this interaction.
   */
  set model(model: IModel) {
    this._model = model;
  }

  /**
   * Set the prompt of this interaction.
   * @param {string} prompt The prompt of this interaction.
   */
  set prompt(prompt: string) {
    this._prompt = prompt;
  }

  /**
   * Set the response of this interaction.
   * @param {string} response The response of this interaction.
   */
  set response(response: string) {
    this._response = response;
  }

  /**
   * Set the input files of this interaction.
   * @param {IFile[]} inputFiles The input files of this interaction.
   */
  set inputFiles(inputFiles: IFile[]) {
    this._inputFiles = inputFiles;
  }

  /**
   * Set the output files of this interaction.
   * @param {IFile[]} outputFiles The output files of this interaction.
   */
  set outputFiles(outputFiles: IFile[]) {
    this._outputFiles = outputFiles;
  }

  /**
   * Set whether this interaction succeeded or not.
   * @param {boolean} succeeded Whether this interaction succeeded
   */
  set succeeded(succeeded: boolean) {
    this._succeeded = succeeded;
  }

  /**
   * @returns {string} A string representation of this interaction.
   */
  public toString(): string {
    return `Interaction ${this._id} at ${this._date} with model ${this._model.name}`;
  }
}
