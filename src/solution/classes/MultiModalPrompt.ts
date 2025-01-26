import TextPrompt from "./TextPrompt";
import type IMultiModalPrompt from "../interfaces/IMultiModalPrompt";
import type IAttachment from "../interfaces/IAttachment";

/**
 * @class Implementing the duties of a multimodal prompt.
 */
export default class MultiModalPrompt extends TextPrompt implements IMultiModalPrompt {
  protected _inputAttachments: IAttachment[];
  protected _outputAttachments: IAttachment[];

  /**
   * Initializes the multimodal prompt.
   * @param {string} model The generative AI model used for this prompt.
   * @param {string} version The version of the model used.
   * @param {string} type The type of prompt.
   * @param {Date} date The date the prompt was created.
   * @param {string} result The result of the prompt.
   * @param {string} input The input text of the prompt.
   * @param {string} output The output text of the prompt.
   * @param {IAttachment[]} inputAttachments The input attachments of the prompt.
   * @param {IAttachment[]} outputAttachments The output attachments of the prompt.
   */
  public constructor(
    model: string = "Claude",
    version: string = "Sonnet 3.5",
    type: string = "Multimodal",
    date: Date = new Date(),
    result: string = "Successful",
    input: string = "Please translate Eng-to-French: 'Hello, world!'",
    output: string = "Bonjour, le monde!",
    inputAttachments: IAttachment[] = [],
    outputAttachments: IAttachment[] = []
  ) {
    super(model, version, type, date, result, input, output);
    if (!inputAttachments) {
      throw new Error("Invalid prompt input attachments");
    }
    if (!outputAttachments) {
      throw new Error("Invalid prompt output attachments");
    }
    this._inputAttachments = inputAttachments;
    this._outputAttachments = outputAttachments;
  }

  /**
   * Gets the input attachments of the prompt.
   * @returns {IAttachment[]} The input attachments of the prompt.
   */
  public get inputAttachments(): IAttachment[] {
    return this._inputAttachments;
  }

  /**
   * Gets the output attachments of the prompt.
   * @returns {IAttachment[]} The output attachments of the prompt.
   */
  public get outputAttachments(): IAttachment[] {
    return this._outputAttachments;
  }

  /**
   * Sets the input attachments of the prompt.
   * @param {IAttachment[]} inputAttachments The input attachments of the prompt.
   */
  public set inputAttachments(inputAttachments: IAttachment[]) {
    if (!inputAttachments) {
      throw new Error("Invalid prompt input attachments");
    }
    this._inputAttachments = inputAttachments;
  }

  /**
   * Sets the output attachments of the prompt.
   * @param {IAttachment[]} outputAttachments The output attachments of the prompt.
   */
  public set outputAttachments(outputAttachments: IAttachment[]) {
    if (!outputAttachments) {
      throw new Error("Invalid prompt output attachments");
    }
    this._outputAttachments = outputAttachments;
  }

  /**
   * Returns a string representation of the multimodal prompt.
   * @returns {string} The multimodal prompt as a string.
   */
  public toString(): string {
    return `${super.toString()}, Input Attachments: ${this._inputAttachments}, Output Attachments: ${this._outputAttachments}`;
  }
}
