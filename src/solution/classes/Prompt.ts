import type IPrompt from "../interfaces/IPrompt";
import { PromptResult } from "../enums";
import { v4 as uuidv4 } from "uuid";

/**
 * @class Implementing the duties of a prompt.
 */
export default class Prompt implements IPrompt {
  protected readonly _id: string = uuidv4();
  protected _model: string;
  protected _version: string;
  protected _type: string;
  protected _date: Date;
  protected _result: PromptResult;

  /**
   * Initializes the prompt.
   * @param {string} model The generative AI model used for this prompt.
   * @param {string} version The version of the model used.
   * @param {string} type The type of prompt.
   * @param {Date} date The date the prompt was created.
   * @param {PromptResult} result The result of the prompt.
   */
  public constructor(
    model: string = "Claude",
    version: string = "Sonnet 3.5",
    type: string = "Text-to-Text",
    date: Date = new Date(),
    result: PromptResult = PromptResult.Success
  ) {
    if (!model) {
      throw new Error("Invalid prompt model");
    }
    if (!version) {
      throw new Error("Invalid prompt version");
    }
    if (!type) {
      throw new Error("Invalid prompt type");
    }
    if (isNaN(date.getTime())) {
      throw new Error("Invalid prompt date");
    }
    if (!result) {
      throw new Error("Invalid prompt result");
    }
    this._model = model;
    this._version = version;
    this._type = type;
    this._date = date;
    this._result = result;
  }

  /**
   * Gets the prompt id.
   * @returns {string} The prompt id.
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Gets the generative AI model used for this prompt.
   * @returns {string} The model used.
   */
  public get model(): string {
    return this._model;
  }

  /**
   * Gets the version of the model used.
   * @returns {string} The model version.
   */
  public get version(): string {
    return this._version;
  }

  /**
   * Gets the type of prompt.
   * E.g. "Text".
   * @returns {string} The prompt type.
   */
  public get type(): string {
    return this._type;
  }

  /**
   * Gets the date the prompt was created.
   * @returns {string} The prompt date.
   */
  public get date(): Date {
    return this._date;
  }

  /**
   * Gets the result of the prompt.
   * E.g. "Success or Failure".
   * @returns {PromptResult} The prompt result.
   */
  public get result(): PromptResult {
    return this._result;
  }

  /**
   * Sets the generative AI model used for this prompt.
   * @param {string} model The model used.
   * @throws {Error} If the model is invalid.
   */
  public set model(model: string) {
    if (!model) {
      throw new Error("Invalid prompt model");
    }
    this._model = model;
  }

  /**
   * Sets the version of the model used.
   * @param {string} version The model version.
   * @throws {Error} If the version is invalid
   */
  public set version(version: string) {
    if (!version) {
      throw new Error("Invalid prompt version");
    }
    this._version = version;
  }

  /**
   * Sets the type of prompt.
   * E.g. "Text".
   * @param {string} type The prompt type.
   * @throws {Error} If the type is invalid.
   */
  public set type(type: string) {
    if (!type) {
      throw new Error("Invalid prompt type");
    }
    this._type = type;
  }

  /**
   * Sets the date the prompt was created.
   * @param {string} date The prompt date.
   * @throws {Error} If the date is invalid.
   */
  public set date(date: Date) {
    if (isNaN(date.getTime())) {
      throw new Error("Invalid prompt date");
    }
    this._date = date;
  }

  /**
   * Sets the result of the prompt.
   * @param {PromptResult} result The prompt result.
   * @throws {Error} If the result is invalid.
   */
  public set result(result: PromptResult) {
    if (!result) {
      throw new Error("Invalid prompt result");
    }
    this._result = result;
  }

  /**
   * Returns a string representation of the prompt.
   * @returns {string} The prompt as a string.
   */
  public toString(): string {
    return `⭐️ Prompt ${this._id} (${this._date.toLocaleDateString()}) ${this._model} ${this._version} - ${this._result}`;
  }
}
