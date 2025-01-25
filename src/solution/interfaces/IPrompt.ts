/**
 * @Interface IPrompt describing the duties of a prompt.
 */
export default interface IPrompt {
  /**
   * Gets the prompt id.
   * @returns {string} The prompt id.
   */
  get id(): string;

  /**
   * Gets the generative AI model used for this prompt.
   * @returns {string} The model used.
   */
  get model(): string;

  /**
   * Gets the version of the model used.
   * @returns {string} The model version.
   */
  get version(): string;

  /**
   * Gets the type of prompt.
   * E.g. "Text".
   * @returns {string} The prompt type.
   */
  get type(): string;

  /**
   * Gets the date the prompt was created.
   * @returns {string} The prompt date.
   */
  get date(): Date;

  /**
   * Gets the result of the prompt.
   * E.g. "Success, Failure, or anything in between".
   * @returns {string} A string describing the prompt result.
   */
  get result(): string;

  /**
   * Sets the generative AI model used for this prompt.
   * @param {string} model The model used.
   */
  set model(model: string);

  /**
   * Sets the version of the model used.
   * @param {string} version The model version.
   */
  set version(version: string);

  /**
   * Sets the type of prompt.
   * E.g. "Text-to-Text".
   * @param {string} type The prompt type.
   */
  set type(type: string);

  /**
   * Sets the date the prompt was created.
   * @param {string} date The prompt date.
   */
  set date(date: Date);

  /**
   * Sets the result of the prompt.
   * E.g. "Success or Failure or anything in between".
   * @param {string} result A string describing the prompt result.
   */
  set result(result: string);

  /**
   * Returns a string representation of the prompt.
   * @returns {string} The prompt as a string.
   */
  toString(): string;
}
