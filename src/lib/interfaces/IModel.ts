/**
 * Interface representing a generative AI model.
 * @interface IModel
 */
export interface IModel {
  /**
   * Get the provider of the model.
   * @returns {string} The provider of the model.
   */
  get provider(): string;

  /**
   * Get the name of the model.
   * @returns {string} The name of the model.
   */
  get name(): string;

  /**
   * Get the version of the model.
   * @returns {string} The version of the model.
   */
  get version(): string;

  /**
   * Get the model type.
   * @returns {string} The model type.
   */
  get modelType(): string;

  /**
   * Set the provider of the model.
   * @param {string} provider The provider of the model.
   * @throws {Error} - Provider cannot be empty.
   */
  set provider(provider: string);

  /**
   * Set the name of the model.
   * @param {string} name The name of the model.
   * @throws {Error} - Model name cannot be empty.
   */
  set name(name: string);

  /**
   * Set the version of the model.
   * @param {string} version The version of the model.
   * @throws {Error} - Model version cannot be empty.
   */
  set version(version: string);

  /**
   * Set the model type.
   * @param {string} modelType The model type.
   * @throws {Error} - Model type cannot be empty.
   */
  set modelType(modelType: string);
}
