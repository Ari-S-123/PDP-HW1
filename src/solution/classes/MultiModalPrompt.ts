import TextPrompt from "./TextPrompt";
import type IMultiModalPrompt from "../interfaces/IMultiModalPrompt";
import type IAttachment from "../interfaces/IAttachment";
import { PromptResult } from "../enums";

export default class MultiModalPrompt extends TextPrompt implements IMultiModalPrompt {
  protected _attachments: IAttachment[];

  /**
   * Initializes the multimodal prompt.
   * @param {string} model The generative AI model used for this prompt.
   * @param {string} version The version of the model used.
   * @param {string} type The type of prompt.
   * @param {Date} date The date the prompt was created.
   * @param {PromptResult} result The result of the prompt.
   * @param {string} input The input text of the prompt.
   * @param {string} output The output text of the prompt.
   * @param {IAttachment[]} attachments The attachments of the prompt.
   */
  public constructor(
    model: string = "Claude",
    version: string = "Sonnet 3.5",
    type: string = "Multimodal",
    date: Date = new Date(),
    result: PromptResult = PromptResult.Success,
    input: string = "Please translate Eng-to-French: 'Hello, world!'",
    output: string = "Bonjour, le monde!",
    attachments: IAttachment[] = []
  ) {
    super(model, version, type, date, result, input, output);
    if (!attachments) {
      throw new Error("Invalid prompt attachments");
    }
    this._attachments = attachments;
  }

  /**
   * Gets the attachments of the prompt.
   * @returns {IAttachment[]} The attachments of the prompt.
   */
  public get attachments(): IAttachment[] {
    return this._attachments;
  }

  /**
   * Sets the attachments of the prompt, which can be empty.
   * @param {IAttachment[]} attachments The attachments of the prompt.
   */
  public set attachments(attachments: IAttachment[]) {
    this._attachments = attachments;
  }

  /**
   * Returns a string representation of the multimodal prompt.
   * @returns {string} The multimodal prompt as a string.
   */
  toString(): string {
    return `⭐️ Prompt ${this._id} (${this._date.toLocaleDateString()}) ${this._model} ${this._version} - ${this._result} Input: ${this._input} Output: ${this._output} Attachments: ${this._attachments}`;
  }
}
