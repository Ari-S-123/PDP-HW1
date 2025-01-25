import type IAttachment from "./IAttachment";
import type ITextPrompt from "./ITextPrompt";

/**
 * @Interface IMultiModalPrompt describing the duties of a multimodal prompt.
 */
export default interface IMultiModalPrompt extends ITextPrompt {
  /**
   * Gets the input attachments of the prompt.
   * @returns {IAttachment[]} The input attachments of the prompt.
   */
  get inputAttachments(): IAttachment[];

  /**
   * Gets the output attachments of the prompt.
   * @returns {IAttachment[]} The output attachments of the prompt.
   */
  get outputAttachments(): IAttachment[];

  /**
   * Sets the input attachments of the prompt.
   * @param {IAttachment[]} inputAttachments The input attachments of the prompt.
   */
  set inputAttachments(inputAttachments: IAttachment[]);

  /**
   * Sets the output attachments of the prompt.
   * @param {IAttachment[]} outputAttachments The output attachments of the prompt.
   */
  set outputAttachments(outputAttachments: IAttachment[]);
}
