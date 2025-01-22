import type { IFile } from "$lib/interfaces/IFile";

/**
 * Class representing a File
 * @class File
 * @implements {IFile}
 * @property {string} _name - The name of the file
 * @property {string} _type - The type of the file
 * @property {string} _extension - The extension of the file
 * @throws {Error} - Filename cannot be empty.
 * @throws {Error} - Extension cannot be empty.
 * @throws {Error} - Filetype cannot be empty.
 */
export class File implements IFile {
  private _name: string;
  private _type: string;
  private _extension: string;

  /**
   * Creates an instance of a File.
   * @param {string} name - The name of the file
   * @param {string} extension - The extension of the file
   * @param {string} type - The type of the file
   */
  public constructor(name: string, extension: string, type: string) {
    this._name = name;
    this._extension = extension;
    this._type = type;
  }

  /**
   * Gets the name of this file
   * @returns {string} The name of this file
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Gets the extension of this file
   * @returns {string} The extension of this file
   */
  public get extension(): string {
    return this._extension;
  }

  /**
   * Gets the type of this file
   * @returns {string} The type of this file
   */
  public get type(): string {
    return this._type;
  }

  /**
   * Sets the name of this file
   * @param {string} name - The name of this file
   * @throws {Error} - Filename cannot be empty.
   */
  public set name(name: string) {
    if (name === "") {
      throw new Error("Filename cannot be empty.");
    }
    this._name = name;
  }

  /**
   * Sets the extension of this file
   * @param {string} extension - The extension of this file
   * @throws {Error} - Extension cannot be empty.
   */
  public set extension(extension: string) {
    if (extension === "") {
      throw new Error("Extension cannot be empty.");
    }
    this._extension = extension;
  }

  /**
   * Sets the type of this file
   * @param {string} type - The type of this file
   * @throws {Error} - Filetype cannot be empty.
   */
  public set type(type: string) {
    if (type === "") {
      throw new Error("Filetype cannot be empty.");
    }
    this._type = type;
  }

  /**
   * @returns {string} A string representation of this file
   */
  public toString(): string {
    return `${this._name}.${this._extension} is an ${this._type} file.`;
  }
}
