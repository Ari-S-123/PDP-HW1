import { describe, it, expect, beforeEach } from "vitest";
import { DUMMY_MULTIMODAL_PROMPT_1 } from "../../test-dummies/prompts";
import MultiModalPrompt from "../../../solution/classes/MultiModalPrompt";
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
      DUMMY_MULTIMODAL_PROMPT_1.inputAttachments,
      DUMMY_MULTIMODAL_PROMPT_1.outputAttachments
    );
  });

  it("should create a MultiModalPrompt instance with default values", () => {
    const defaultMultiModalPrompt = new MultiModalPrompt();
    expect(defaultMultiModalPrompt.id).toBeTruthy();
    expect(defaultMultiModalPrompt.model).toBe("Claude");
    expect(defaultMultiModalPrompt.version).toBe("Sonnet 3.5");
    expect(defaultMultiModalPrompt.result).toBe("Successful");
    expect(defaultMultiModalPrompt.type).toBe("Multimodal");
    expect(defaultMultiModalPrompt.input).toBe("Please translate Eng-to-French: 'Hello, world!'");
    expect(defaultMultiModalPrompt.output).toBe("Bonjour, le monde!");
    expect(defaultMultiModalPrompt.inputAttachments).toStrictEqual([]);
    expect(defaultMultiModalPrompt.outputAttachments).toStrictEqual([]);
  });

  it("should throw errors for invalid input into constructor", () => {
    // Output can be empty, both attachments can be an empty list
    expect(() => {
      new MultiModalPrompt(
        "",
        "",
        "",
        new Date("invalid"),
        "",
        "",
        DUMMY_MULTIMODAL_PROMPT_1.output,
        DUMMY_MULTIMODAL_PROMPT_1.inputAttachments,
        DUMMY_MULTIMODAL_PROMPT_1.outputAttachments
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
        DUMMY_MULTIMODAL_PROMPT_1.inputAttachments,
        DUMMY_MULTIMODAL_PROMPT_1.outputAttachments
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
        DUMMY_MULTIMODAL_PROMPT_1.inputAttachments,
        DUMMY_MULTIMODAL_PROMPT_1.outputAttachments
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
        DUMMY_MULTIMODAL_PROMPT_1.inputAttachments,
        DUMMY_MULTIMODAL_PROMPT_1.outputAttachments
      );
    }).toThrowError("Invalid prompt date");

    expect(() => {
      new MultiModalPrompt(
        DUMMY_MULTIMODAL_PROMPT_1.model,
        DUMMY_MULTIMODAL_PROMPT_1.version,
        DUMMY_MULTIMODAL_PROMPT_1.type,
        DUMMY_MULTIMODAL_PROMPT_1.date,
        "",
        DUMMY_MULTIMODAL_PROMPT_1.input,
        DUMMY_MULTIMODAL_PROMPT_1.output,
        DUMMY_MULTIMODAL_PROMPT_1.inputAttachments,
        DUMMY_MULTIMODAL_PROMPT_1.outputAttachments
      );
    }).toThrowError("Invalid prompt result");

    expect(() => {
      new MultiModalPrompt(
        DUMMY_MULTIMODAL_PROMPT_1.model,
        DUMMY_MULTIMODAL_PROMPT_1.version,
        DUMMY_MULTIMODAL_PROMPT_1.type,
        DUMMY_MULTIMODAL_PROMPT_1.date,
        DUMMY_MULTIMODAL_PROMPT_1.result,
        "",
        DUMMY_MULTIMODAL_PROMPT_1.output,
        DUMMY_MULTIMODAL_PROMPT_1.inputAttachments,
        DUMMY_MULTIMODAL_PROMPT_1.outputAttachments
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
    expect(testMultiModalPrompt.inputAttachments).toBe(DUMMY_MULTIMODAL_PROMPT_1.inputAttachments);
    expect(testMultiModalPrompt.inputAttachments).not.toContain(DUMMY_ATTACHMENT_1);
    expect(testMultiModalPrompt.outputAttachments).toBe(
      DUMMY_MULTIMODAL_PROMPT_1.outputAttachments
    );
    expect(testMultiModalPrompt.outputAttachments).toContain(DUMMY_ATTACHMENT_1);
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

    const newResult = "Failed";
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

    const newInputAttachments = [newAttachment1];
    const newOutputAttachments = [newAttachment2];
    testMultiModalPrompt.inputAttachments = newInputAttachments;
    expect(testMultiModalPrompt.inputAttachments).toBe(newInputAttachments);
    testMultiModalPrompt.outputAttachments = newOutputAttachments;
    expect(testMultiModalPrompt.outputAttachments).toBe(newOutputAttachments);
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
      testMultiModalPrompt.result = "";
    }).toThrowError("Invalid prompt result");

    expect(() => {
      testMultiModalPrompt.input = "";
    }).toThrowError("Input text cannot be empty.");
  });

  it("should return correct string representation", () => {
    const expectedString = `⭐️ Prompt ID: ${testMultiModalPrompt.id}, Date: (${DUMMY_MULTIMODAL_PROMPT_1.date.toLocaleDateString()}), Model: ${DUMMY_MULTIMODAL_PROMPT_1.model}, Version: ${DUMMY_MULTIMODAL_PROMPT_1.version}, Result: ${DUMMY_MULTIMODAL_PROMPT_1.result}, Input: ${DUMMY_MULTIMODAL_PROMPT_1.input}, Output: ${DUMMY_MULTIMODAL_PROMPT_1.output}, Input Attachments: ${DUMMY_MULTIMODAL_PROMPT_1.inputAttachments}, Output Attachments: ${DUMMY_MULTIMODAL_PROMPT_1.outputAttachments}`;
    expect(testMultiModalPrompt.toString()).toBe(expectedString);
  });
});
