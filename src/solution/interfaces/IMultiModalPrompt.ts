import type IAttachment from "./IAttachment";
import type ITextPrompt from "./ITextPrompt";

/**
 * @Interface IMultiModalPrompt describing the duties of a multimodal prompt.
 */
export default interface IMultiModalPrompt extends ITextPrompt {
  /**
   * Gets the attachments of the prompt.
   * @returns {IAttachment[]} The attachments of the prompt.
   */
  get attachments(): IAttachment[];

  /**
   * Sets the attachments of the prompt.
   * @param {IAttachment[]} attachments The attachments of the prompt.
   */
  set attachments(attachments: IAttachment[]);
}
