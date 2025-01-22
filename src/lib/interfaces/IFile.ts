/**
 * Interface representing a File
 * @interface IFile
 */
export interface IFile {
  /**
   * Gets the name of the file
   * @returns {string} The name of the file
   */
  get name(): string;

  /**
   * Gets the extension of the file
   * @returns {string} The extension of the file
   */
  get extension(): string;

  /**
   * Gets the type of the file
   * @returns {string} The type of the file
   */
  get type(): string;

  /**
   * Sets the name of the file
   * @param {string} name - The name of the file
   * @throws {Error} - Filename cannot be empty.
   */
  set name(name: string);

  /**
   * Sets the extension of the file
   * @param {string} extension - The extension of the file
   * @throws {Error} - Extension cannot be empty.
   */
  set extension(extension: string);

  /**
   * Sets the type of the file
   * @param {string} type - The type of the file
   * @throws {Error} - Filetype cannot be empty.
   */
  set type(type: string);
}
