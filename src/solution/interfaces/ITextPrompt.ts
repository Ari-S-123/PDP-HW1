import type IPrompt from "./IPrompt";

/**
 * @Interface ITextPrompt describing the duties of a text prompt.
 */
export default interface ITextPrompt extends IPrompt {
  /**
   * Gets the input text of the prompt.
   * @returns {string} The input text.
   */
  get input(): string;

  /**
   * Gets the output text of the prompt.
   * @returns {string} The output text.
   */
  get output(): string;

  /**
   * Sets the input text of the prompt.
   * @param {string} input The input text.
   */
  set input(input: string);

  /**
   * Sets the output text of the prompt.
   * @param {string} output The output text.
   */
  set output(output: string);
}
