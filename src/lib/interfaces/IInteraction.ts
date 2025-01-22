import type { IModel } from "$lib/interfaces/IModel";
import type { IFile } from "$lib/interfaces/IFile";

/**
 * Represents an interaction between a user and a generative AI model.
 * @interface IInteraction
 * An interaction consists of a prompt, a response, and a timestamp.
 * The prompt is the input to the model, and the response is the output.
 * The interaction may also include input and output files.
 * The interaction may have succeeded or failed.
 * The interaction is associated with a model.
 * The interaction is uniquely identified by an ID.
 */
export interface IInteraction {
  /**
   * Get the id of the interaction.
   * @returns {string} The id of the interaction.
   */
  get id(): string;

  /**
   * Get the date of the interaction.
   * @returns {Date} The date of the interaction.
   */
  get date(): Date;

  /**
   * Get the model associated with the interaction.
   * @returns {IModel} The model associated with the interaction.
   */
  get model(): IModel;

  /**
   * Get the prompt of the interaction.
   * @returns {string} The prompt of the interaction.
   */
  get prompt(): string;

  /**
   * Get the response of the interaction.
   * @returns {string} The response of the interaction.
   */
  get response(): string;

  /**
   * Get the input files of the interaction.
   * @returns {IFile[]} The input files of the interaction.
   */
  get inputFiles(): IFile[];

  /**
   * Get the output files of the interaction.
   * @returns {IFile[]} The output files of the interaction.
   */
  get outputFiles(): IFile[];

  /**
   * Get whether the interaction succeeded or not.
   * @returns {boolean} Whether the interaction succeeded
   */
  get succeeded(): boolean;

  /**
   * Set the date of the interaction.
   * @param {Date} date The date of the interaction.
   */
  set date(date: Date);

  /**
   * Set the model associated with the interaction.
   * @param {IModel} model The model associated with the interaction.
   */
  set model(model: IModel);

  /**
   * Set the prompt of the interaction.
   * @param {string} prompt The prompt of the interaction.
   * @throws {Error} - Prompt cannot be empty.
   */
  set prompt(prompt: string);

  /**
   * Set the response of the interaction.
   * @param {string} response The response of the interaction.
   */
  set response(response: string);

  /**
   * Set the input files of the interaction.
   * @param {IFile[]} inputFiles The input files of the interaction.
   */
  set inputFiles(inputFiles: IFile[]);

  /**
   * Set the output files of the interaction.
   * @param {IFile[]} outputFiles The output files of the interaction.
   */
  set outputFiles(outputFiles: IFile[]);

  /**
   * Set whether the interaction succeeded or not.
   * @param {boolean} succeeded Whether the interaction succeeded.
   */
  set succeeded(succeeded: boolean);
}
