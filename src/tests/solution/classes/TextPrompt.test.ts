import { describe, it, expect, beforeEach } from "vitest";
import { DUMMY_TEXT_PROMPT_1 } from "../../test-dummies/prompts";
import TextPrompt from "../../../solution/classes/TextPrompt";
import { PromptResult } from "../../../solution/enums";

describe("TextPrompt Test Suite", () => {
  let testTextPrompt: TextPrompt;

  beforeEach(() => {
    testTextPrompt = new TextPrompt(
      DUMMY_TEXT_PROMPT_1.model,
      DUMMY_TEXT_PROMPT_1.version,
      DUMMY_TEXT_PROMPT_1.type,
      DUMMY_TEXT_PROMPT_1.date,
      DUMMY_TEXT_PROMPT_1.result,
      DUMMY_TEXT_PROMPT_1.input,
      DUMMY_TEXT_PROMPT_1.output
    );
  });

  it("should create a TextPrompt instance with default values", () => {
    const defaultTextPrompt = new TextPrompt();
    expect(defaultTextPrompt.id).toBeTruthy();
    expect(defaultTextPrompt.model).toBe("Claude");
    expect(defaultTextPrompt.version).toBe("Sonnet 3.5");
    expect(defaultTextPrompt.result).toBe("Success");
    expect(defaultTextPrompt.type).toBe("Text-to-Text");
    expect(defaultTextPrompt.input).toBe("Please translate Eng-to-French: 'Hello, world!'");
    expect(defaultTextPrompt.output).toBe("Bonjour, le monde!");
  });

  it("should throw errors for invalid input into constructor", () => {
    // Invalid prompt should not be possible because of the enum, output can be empty
    expect(() => {
      new TextPrompt(
        "",
        "",
        "",
        new Date("invalid"),
        DUMMY_TEXT_PROMPT_1.result,
        "",
        DUMMY_TEXT_PROMPT_1.output
      );
    }).toThrowError("Invalid prompt model");
    expect(() => {
      new TextPrompt(
        "",
        DUMMY_TEXT_PROMPT_1.version,
        DUMMY_TEXT_PROMPT_1.type,
        DUMMY_TEXT_PROMPT_1.date,
        DUMMY_TEXT_PROMPT_1.result,
        DUMMY_TEXT_PROMPT_1.input,
        DUMMY_TEXT_PROMPT_1.output
      );
    }).toThrowError("Invalid prompt model");

    expect(() => {
      new TextPrompt(
        DUMMY_TEXT_PROMPT_1.model,
        "",
        DUMMY_TEXT_PROMPT_1.type,
        DUMMY_TEXT_PROMPT_1.date,
        DUMMY_TEXT_PROMPT_1.result,
        DUMMY_TEXT_PROMPT_1.input,
        DUMMY_TEXT_PROMPT_1.output
      );
    }).toThrowError("Invalid prompt version");

    expect(() => {
      new TextPrompt(
        DUMMY_TEXT_PROMPT_1.model,
        DUMMY_TEXT_PROMPT_1.version,
        DUMMY_TEXT_PROMPT_1.type,
        new Date("invalid"),
        DUMMY_TEXT_PROMPT_1.result,
        DUMMY_TEXT_PROMPT_1.input,
        DUMMY_TEXT_PROMPT_1.output
      );
    }).toThrowError("Invalid prompt date");

    expect(() => {
      new TextPrompt(
        DUMMY_TEXT_PROMPT_1.model,
        DUMMY_TEXT_PROMPT_1.version,
        DUMMY_TEXT_PROMPT_1.type,
        DUMMY_TEXT_PROMPT_1.date,
        DUMMY_TEXT_PROMPT_1.result,
        "",
        DUMMY_TEXT_PROMPT_1.output
      );
    }).toThrowError("Invalid prompt input");
  });

  it("should return correct values for getters", () => {
    expect(testTextPrompt.date).toBeInstanceOf(Date);
    expect(testTextPrompt.id).toBeTruthy();
    expect(testTextPrompt.model).toBe(DUMMY_TEXT_PROMPT_1.model);
    expect(testTextPrompt.version).toBe(DUMMY_TEXT_PROMPT_1.version);
    expect(testTextPrompt.result).toBe(DUMMY_TEXT_PROMPT_1.result);
    expect(testTextPrompt.type).toBe(DUMMY_TEXT_PROMPT_1.type);
    expect(testTextPrompt.input).toBe(DUMMY_TEXT_PROMPT_1.input);
    expect(testTextPrompt.output).toBe(DUMMY_TEXT_PROMPT_1.output);
  });

  it("should return correct values for setters", () => {
    const newDate = new Date("2021-01-01");
    testTextPrompt.date = newDate;
    expect(testTextPrompt.date).toBe(newDate);

    const newModel = "Shakespeare";
    testTextPrompt.model = newModel;
    expect(testTextPrompt.model).toBe(newModel);

    const newVersion = "Sonnet 18";
    testTextPrompt.version = newVersion;
    expect(testTextPrompt.version).toBe(newVersion);

    const newResult = PromptResult.Failure;
    testTextPrompt.result = newResult;
    expect(testTextPrompt.result).toBe(newResult);

    const newInput = "Please translate Eng-to-German: 'Hello, world!'";
    testTextPrompt.input = newInput;
    expect(testTextPrompt.input).toBe(newInput);

    const newOutput = "Hallo, Welt!";
    testTextPrompt.output = newOutput;
    expect(testTextPrompt.output).toBe(newOutput);
  });

  it("should throw errors for invalid input into setters", () => {
    expect(() => {
      testTextPrompt.date = new Date("invalid");
    }).toThrowError("Invalid prompt date");

    expect(() => {
      testTextPrompt.model = "";
    }).toThrowError("Invalid prompt model");

    expect(() => {
      testTextPrompt.version = "";
    }).toThrowError("Invalid prompt version");

    expect(() => {
      testTextPrompt.input = "";
    }).toThrowError("Input text cannot be empty.");
  });

  it("should return correct string representation", () => {
    const expectedString = `⭐️ Prompt ID: ${testTextPrompt.id}, Date: (${DUMMY_TEXT_PROMPT_1.date.toLocaleDateString()}), Model: ${DUMMY_TEXT_PROMPT_1.model}, Version: ${DUMMY_TEXT_PROMPT_1.version}, Result: ${DUMMY_TEXT_PROMPT_1.result}, Input: ${DUMMY_TEXT_PROMPT_1.input}, Output: ${DUMMY_TEXT_PROMPT_1.output}`;
    expect(testTextPrompt.toString()).toBe(expectedString);
  });
});
