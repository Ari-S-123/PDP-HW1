import { describe, it, expect, beforeEach } from "vitest";
import { DUMMY_MULTIMODAL_PROMPT_1 } from "../../test-dummies/prompts";
import MultiModalPrompt from "../../../solution/classes/MultiModalPrompt";
import { PromptResult } from "../../../solution/enums";
import { DUMMY_ATTACHMENT_1 } from "../../test-dummies/attachments";
import Attachment from "../../../solution/classes/Attachment";

describe("MultiModalPrompt Test Suite", () => {
  let testMultiModalPrompt: MultiModalPrompt;

  beforeEach(() => {
    testMultiModalPrompt = new MultiModalPrompt(
      DUMMY_MULTIMODAL_PROMPT_1.model,
      DUMMY_MULTIMODAL_PROMPT_1.version,
      DUMMY_MULTIMODAL_PROMPT_1.type,
      DUMMY_MULTIMODAL_PROMPT_1.date,
      DUMMY_MULTIMODAL_PROMPT_1.result,
      DUMMY_MULTIMODAL_PROMPT_1.input,
      DUMMY_MULTIMODAL_PROMPT_1.output,
      DUMMY_MULTIMODAL_PROMPT_1.attachments
    );
  });

  it("should create a MultiModalPrompt instance with default values", () => {
    const defaultMultiModalPrompt = new MultiModalPrompt();
    expect(defaultMultiModalPrompt.id).toBeTruthy();
    expect(defaultMultiModalPrompt.model).toBe("Claude");
    expect(defaultMultiModalPrompt.version).toBe("Sonnet 3.5");
    expect(defaultMultiModalPrompt.result).toBe("Success");
    expect(defaultMultiModalPrompt.type).toBe("Multimodal");
    expect(defaultMultiModalPrompt.input).toBe("Please translate Eng-to-French: 'Hello, world!'");
    expect(defaultMultiModalPrompt.output).toBe("Bonjour, le monde!");
    expect(defaultMultiModalPrompt.attachments).toStrictEqual([]);
  });

  it("should throw errors for invalid input into constructor", () => {
    // Invalid prompt should not be possible because of the enum, output can be empty, attachments can be an empty list
    expect(() => {
      new MultiModalPrompt(
        "",
        "",
        "",
        new Date("invalid"),
        DUMMY_MULTIMODAL_PROMPT_1.result,
        "",
        DUMMY_MULTIMODAL_PROMPT_1.output,
        DUMMY_MULTIMODAL_PROMPT_1.attachments
      );
    }).toThrowError("Invalid prompt model");
    expect(() => {
      new MultiModalPrompt(
        "",
        DUMMY_MULTIMODAL_PROMPT_1.version,
        DUMMY_MULTIMODAL_PROMPT_1.type,
        DUMMY_MULTIMODAL_PROMPT_1.date,
        DUMMY_MULTIMODAL_PROMPT_1.result,
        DUMMY_MULTIMODAL_PROMPT_1.input,
        DUMMY_MULTIMODAL_PROMPT_1.output,
        DUMMY_MULTIMODAL_PROMPT_1.attachments
      );
    }).toThrowError("Invalid prompt model");

    expect(() => {
      new MultiModalPrompt(
        DUMMY_MULTIMODAL_PROMPT_1.model,
        "",
        DUMMY_MULTIMODAL_PROMPT_1.type,
        DUMMY_MULTIMODAL_PROMPT_1.date,
        DUMMY_MULTIMODAL_PROMPT_1.result,
        DUMMY_MULTIMODAL_PROMPT_1.input,
        DUMMY_MULTIMODAL_PROMPT_1.output,
        DUMMY_MULTIMODAL_PROMPT_1.attachments
      );
    }).toThrowError("Invalid prompt version");

    expect(() => {
      new MultiModalPrompt(
        DUMMY_MULTIMODAL_PROMPT_1.model,
        DUMMY_MULTIMODAL_PROMPT_1.version,
        DUMMY_MULTIMODAL_PROMPT_1.type,
        new Date("invalid"),
        DUMMY_MULTIMODAL_PROMPT_1.result,
        DUMMY_MULTIMODAL_PROMPT_1.input,
        DUMMY_MULTIMODAL_PROMPT_1.output,
        DUMMY_MULTIMODAL_PROMPT_1.attachments
      );
    }).toThrowError("Invalid prompt date");

    expect(() => {
      new MultiModalPrompt(
        DUMMY_MULTIMODAL_PROMPT_1.model,
        DUMMY_MULTIMODAL_PROMPT_1.version,
        DUMMY_MULTIMODAL_PROMPT_1.type,
        DUMMY_MULTIMODAL_PROMPT_1.date,
        DUMMY_MULTIMODAL_PROMPT_1.result,
        "",
        DUMMY_MULTIMODAL_PROMPT_1.output,
        DUMMY_MULTIMODAL_PROMPT_1.attachments
      );
    }).toThrowError("Invalid prompt input");
  });

  it("should return correct values for getters", () => {
    expect(testMultiModalPrompt.date).toBeInstanceOf(Date);
    expect(testMultiModalPrompt.id).toBeTruthy();
    expect(testMultiModalPrompt.model).toBe(DUMMY_MULTIMODAL_PROMPT_1.model);
    expect(testMultiModalPrompt.version).toBe(DUMMY_MULTIMODAL_PROMPT_1.version);
    expect(testMultiModalPrompt.result).toBe(DUMMY_MULTIMODAL_PROMPT_1.result);
    expect(testMultiModalPrompt.type).toBe(DUMMY_MULTIMODAL_PROMPT_1.type);
    expect(testMultiModalPrompt.input).toBe(DUMMY_MULTIMODAL_PROMPT_1.input);
    expect(testMultiModalPrompt.output).toBe(DUMMY_MULTIMODAL_PROMPT_1.output);
    expect(testMultiModalPrompt.attachments).toBe(DUMMY_MULTIMODAL_PROMPT_1.attachments);
    expect(testMultiModalPrompt.attachments).toContain(DUMMY_ATTACHMENT_1);
  });

  it("should return correct values for setters", () => {
    const newDate = new Date("2021-01-01");
    testMultiModalPrompt.date = newDate;
    expect(testMultiModalPrompt.date).toBe(newDate);

    const newModel = "Shakespeare";
    testMultiModalPrompt.model = newModel;
    expect(testMultiModalPrompt.model).toBe(newModel);

    const newVersion = "Sonnet 18";
    testMultiModalPrompt.version = newVersion;
    expect(testMultiModalPrompt.version).toBe(newVersion);

    const newResult = PromptResult.Failure;
    testMultiModalPrompt.result = newResult;
    expect(testMultiModalPrompt.result).toBe(newResult);

    const newType = "Text-to-Video";
    testMultiModalPrompt.type = newType;
    expect(testMultiModalPrompt.type).toBe(newType);

    const newInput = "Please translate Eng-to-German: 'Hello, world!'";
    testMultiModalPrompt.input = newInput;
    expect(testMultiModalPrompt.input).toBe(newInput);

    const newOutput = "Hallo, Welt!";
    testMultiModalPrompt.output = newOutput;
    expect(testMultiModalPrompt.output).toBe(newOutput);

    const newAttachment1 = new Attachment("audio", "screaming.mp3");
    const newAttachment2 = new Attachment("video", "meme.mp4");

    const newAttachments = [newAttachment1, newAttachment2];
    testMultiModalPrompt.attachments = newAttachments;
    expect(testMultiModalPrompt.attachments).toBe(newAttachments);
  });

  it("should throw errors for invalid input into setters", () => {
    expect(() => {
      testMultiModalPrompt.date = new Date("invalid");
    }).toThrowError("Invalid prompt date");

    expect(() => {
      testMultiModalPrompt.model = "";
    }).toThrowError("Invalid prompt model");

    expect(() => {
      testMultiModalPrompt.version = "";
    }).toThrowError("Invalid prompt version");

    expect(() => {
      testMultiModalPrompt.input = "";
    }).toThrowError("Input text cannot be empty.");
  });

  it("should return correct string representation", () => {
    const expectedString = `⭐️ Prompt ${testMultiModalPrompt.id} (${DUMMY_MULTIMODAL_PROMPT_1.date.toLocaleDateString()}) ${DUMMY_MULTIMODAL_PROMPT_1.model} ${DUMMY_MULTIMODAL_PROMPT_1.version} - ${DUMMY_MULTIMODAL_PROMPT_1.result} Input: ${DUMMY_MULTIMODAL_PROMPT_1.input} Output: ${DUMMY_MULTIMODAL_PROMPT_1.output} Attachments: ${DUMMY_MULTIMODAL_PROMPT_1.attachments}`;
    expect(testMultiModalPrompt.toString()).toBe(expectedString);
  });
});
