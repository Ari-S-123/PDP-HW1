import Prompt from "./Prompt";
import type ITextPrompt from "../interfaces/ITextPrompt";

/**
 * @class Implementing the duties of a text prompt.
 */
export default class TextPrompt extends Prompt implements ITextPrompt {
  protected _input: string;
  protected _output: string;

  /**
   * Initializes the text prompt.
   * @param {string} model The generative AI model used for this prompt.
   * @param {string} version The version of the model used.
   * @param {string} type The type of prompt.
   * @param {Date} date The date the prompt was created.
   * @param {string} result The result of the prompt.
   * @param {string} input The input text of the prompt.
   * @param {string} output The output text of the prompt.
   */
  public constructor(
    model: string = "Claude",
    version: string = "Sonnet 3.5",
    type: string = "Text-to-Text",
    date: Date = new Date(),
    result: string = "Successful",
    input: string = "Please translate Eng-to-French: 'Hello, world!'",
    output: string = "Bonjour, le monde!"
  ) {
    super(model, version, type, date, result);
    if (!input) {
      throw new Error("Invalid prompt input");
    }
    if (!output) {
      throw new Error("Invalid prompt output");
    }
    this._input = input;
    this._output = output;
  }

  /**
   * Gets the input text of the prompt.
   * @returns {string} The input text.
   */
  public get input(): string {
    return this._input;
  }

  /**
   * Gets the output text of the prompt.
   * @returns {string} The output text.
   */
  public get output(): string {
    return this._output;
  }

  /**
   * Sets the input text of the prompt.
   * @param {string} input The input text.
   * @throws {Error} If the input text is empty.
   */
  public set input(input: string) {
    if (!input) {
      throw new Error("Input text cannot be empty.");
    }
    this._input = input;
  }

  /**
   * Sets the output text of the prompt. This can be empty if the prompt failed.
   * @param {string} output The output text.
   */
  public set output(output: string) {
    this._output = output;
  }

  /**
   * Returns a string representation of the text prompt.
   * @returns {string} The text prompt as a string.
   */
  public toString(): string {
    return `${super.toString()}, Input: ${this._input}, Output: ${this._output}`;
  }
}
