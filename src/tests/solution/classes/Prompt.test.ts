import { beforeEach, describe, expect, it } from "vitest";
import { DUMMY_PROMPT_1 } from "../../test-dummies/prompts";
import Prompt from "../../../solution/classes/Prompt";

describe("Prompt Test Suite", () => {
  let testPrompt: Prompt;

  beforeEach(() => {
    testPrompt = new Prompt(
      DUMMY_PROMPT_1.model,
      DUMMY_PROMPT_1.version,
      DUMMY_PROMPT_1.type,
      DUMMY_PROMPT_1.date,
      DUMMY_PROMPT_1.result
    );
  });

  it("should throw errors for invalid input into constructor", () => {
    expect(() => {
      new Prompt("", "", "", new Date("invalid"), "");
    }).toThrowError("Invalid prompt model");
    expect(() => {
      new Prompt(
        "",
        DUMMY_PROMPT_1.version,
        DUMMY_PROMPT_1.type,
        DUMMY_PROMPT_1.date,
        DUMMY_PROMPT_1.result
      );
    }).toThrowError("Invalid prompt model");

    expect(() => {
      new Prompt(
        DUMMY_PROMPT_1.model,
        "",
        DUMMY_PROMPT_1.type,
        DUMMY_PROMPT_1.date,
        DUMMY_PROMPT_1.result
      );
    }).toThrowError("Invalid prompt version");

    expect(() => {
      new Prompt(
        DUMMY_PROMPT_1.model,
        DUMMY_PROMPT_1.version,
        DUMMY_PROMPT_1.type,
        new Date("invalid"),
        DUMMY_PROMPT_1.result
      );
    }).toThrowError("Invalid prompt date");

    expect(() => {
      new Prompt(
        DUMMY_PROMPT_1.model,
        DUMMY_PROMPT_1.version,
        DUMMY_PROMPT_1.type,
        DUMMY_PROMPT_1.date,
        ""
      );
    }).toThrowError("Invalid prompt result");
  });

  it("should create a Prompt instance with default values", () => {
    const defaultPrompt = new Prompt();
    expect(defaultPrompt.id).toBeTruthy();
    expect(defaultPrompt.model).toBe("Claude");
    expect(defaultPrompt.version).toBe("Sonnet 3.5");
    expect(defaultPrompt.result).toBe("Successful");
    expect(defaultPrompt.type).toBe("Text-to-Text");
  });

  it("should return correct values for getters", () => {
    expect(testPrompt.date).toBeInstanceOf(Date);
    expect(testPrompt.id).toBeTruthy();
    expect(testPrompt.model).toBe(DUMMY_PROMPT_1.model);
    expect(testPrompt.version).toBe(DUMMY_PROMPT_1.version);
    expect(testPrompt.result).toBe(DUMMY_PROMPT_1.result);
    expect(testPrompt.type).toBe(DUMMY_PROMPT_1.type);
  });

  it("should return correct values for setters", () => {
    const newDate = new Date("2021-01-01");
    testPrompt.date = newDate;
    expect(testPrompt.date).toBe(newDate);

    const newModel = "Shakespeare";
    testPrompt.model = newModel;
    expect(testPrompt.model).toBe(newModel);

    const newVersion = "Sonnet 18";
    testPrompt.version = newVersion;
    expect(testPrompt.version).toBe(newVersion);

    const newResult = "Failed";
    testPrompt.result = newResult;
    expect(testPrompt.result).toBe(newResult);

    const newType = "Text-to-Image";
    testPrompt.type = newType;
    expect(testPrompt.type).toBe(newType);
  });

  // This test was generated using GitHub Copilot.
  it("should throw errors for invalid input into setters", () => {
    expect(() => {
      testPrompt.date = new Date("invalid");
    }).toThrowError("Invalid prompt date");

    expect(() => {
      testPrompt.model = "";
    }).toThrowError("Invalid prompt model");

    expect(() => {
      testPrompt.version = "";
    }).toThrowError("Invalid prompt version");

    expect(() => {
      testPrompt.result = "";
    }).toThrowError("Invalid prompt result");
  });

  it("should return correct string representation", () => {
    const expectedString = `⭐️ Prompt ID: ${testPrompt.id}, Date: (${DUMMY_PROMPT_1.date.toLocaleDateString()}), Model: ${DUMMY_PROMPT_1.model}, Version: ${DUMMY_PROMPT_1.version}, Result: ${DUMMY_PROMPT_1.result}`;
    expect(testPrompt.toString()).toBe(expectedString);
  });
});
