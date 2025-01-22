import type { IModel } from "$lib/interfaces/IModel";

/**
 * Class representing a generative AI model.
 * @class Model
 */
export class Model implements IModel {
  private _modelType: string;
  private _name: string;
  private _provider: string;
  private _version: string;

  /**
   * Creates an instance of a Model.
   * @param {string} name - The name of the model
   * @param {string} modelType - The type of the model
   * @param {string} provider - The provider of the model
   * @param {string} version - The version of the model
   */
  public constructor(name: string, modelType: string, provider: string, version: string) {
    this._modelType = modelType;
    this._name = name;
    this._provider = provider;
    this._version = version;
  }

  /**
   * Gets the name of this model.
   * @returns {string} The name of this model
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Gets the type of this model.
   * @returns {string} The type of this model
   */
  public get modelType(): string {
    return this._modelType;
  }

  /**
   * Gets the provider of this model.
   * @returns {string} The provider of this model
   */
  public get provider(): string {
    return this._provider;
  }

  /**
   * Gets the version of this model.
   * @returns {string} The version of this model
   */
  public get version(): string {
    return this._version;
  }

  /**
   * Sets the name of this model.
   * @param {string} name - The name of this model
   * @throws {Error} - Model name cannot be empty.
   */
  public set name(name: string) {
    if (name === "") {
      throw new Error("Model name cannot be empty.");
    }
    this._name = name;
  }

  /**
   * Sets the type of this model.
   * @param {string} modelType - The type of this model
   * @throws {Error} - Model type cannot be empty.
   */
  public set modelType(modelType: string) {
    if (modelType === "") {
      throw new Error("Model type cannot be empty.");
    }
    this._modelType = modelType;
  }

  /**
   * Sets the provider of this model.
   * @param {string} provider - The provider of this model
   * @throws {Error} - Model provider cannot be empty.
   */
  public set provider(provider: string) {
    if (provider === "") {
      throw new Error("Model provider cannot be empty.");
    }
    this._provider = provider;
  }

  /**
   * Sets the version of this model.
   * @param {string} version - The version of this model
   * @throws {Error} - Model version cannot be empty.
   */
  public set version(version: string) {
    if (version === "") {
      throw new Error("Model version cannot be empty.");
    }
    this._version = version;
  }

  /**
   * @returns {string} A string representation of this model
   */
  public toString(): string {
    return `${this._name} (${this._modelType}) by ${this._provider} v${this._version}`;
  }
}
