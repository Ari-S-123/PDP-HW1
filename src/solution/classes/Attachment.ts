import type IAttachment from "../interfaces/IAttachment";

/**
 * @class Implementing the duties of an attachment.
 */
export default class Attachment implements IAttachment {
  private _type: string;
  private _payload: string;

  /**
   * @constructor Initializing the attachment.
   * @param {string} type The type of the attachment.
   * @param {string} payload The payload of the attachment.
   */
  public constructor(type: string, payload: string) {
    this._type = type;
    this._payload = payload;
  }

  /**
   * Gets the type of the attachment.
   * @returns {string} The type of the attachment.
   */
  public get type(): string {
    return this._type;
  }

  /**
   * Gets the payload of the attachment.
   * @returns {string} The payload of the attachment.
   */
  public get payload(): string {
    return this._payload;
  }

  /**
   * Sets the type of the attachment.
   * @param {string} type The type of the attachment.
   * @throws {Error} Type cannot be null or empty.
   */
  public set type(type: string) {
    if (!type) {
      throw new Error("Type cannot be null or empty.");
    }
    this._type = type;
  }

  /**
   * Sets the payload of the attachment.
   * @param {string} payload The payload of the attachment.
   * @throws {Error} Payload cannot be null or empty.
   */
  public set payload(payload: string) {
    if (!payload) {
      throw new Error("Payload cannot be null or empty.");
    }
    this._payload = payload;
  }

  /**
   * Returns a string representation of the attachment.
   * @returns {string} The attachment as a string.
   */
  public toString(): string {
    return `Type: ${this._type}, Payload: ${this._payload}`;
  }
}
