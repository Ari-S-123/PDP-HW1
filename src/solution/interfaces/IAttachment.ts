/**
 * @Interface IAttachment describing the duties of an attachment.
 */
export default interface IAttachment {
  /**
   * Gets the type of the attachment.
   * @returns {string} The type of the attachment.
   */
  get type(): string;

  /**
   * Gets the payload of the attachment.
   * @returns {string} The payload of the attachment.
   */
  get payload(): string;

  /**
   * Sets the type of the attachment.
   * @param {string} type The type of the attachment.
   */

  set type(type: string);

  /**
   * Sets the payload of the attachment.
   * @param {string} payload The payload of the attachment.
   */
  set payload(payload: string);

  /**
   * Returns a string representation of the attachment.
   * @returns {string} The attachment as a string.
   */
  toString(): string;
}
