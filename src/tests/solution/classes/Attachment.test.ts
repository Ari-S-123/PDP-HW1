import { describe, it, expect, beforeEach } from "vitest";
import { DUMMY_ATTACHMENT_1, DUMMY_ATTACHMENT_2 } from "../../test-dummies/attachments";
import Attachment from "../../../solution/classes/Attachment";

describe("Attachment Test Suite", () => {
  let testAttachment: Attachment;
  beforeEach(() => {
    testAttachment = new Attachment(DUMMY_ATTACHMENT_1.type, DUMMY_ATTACHMENT_1.payload);
  });
  it("should create an Attachment instance with given type and payload", () => {
    expect(testAttachment.type).toBe(DUMMY_ATTACHMENT_1.type);
    expect(testAttachment.payload).toBe(DUMMY_ATTACHMENT_1.payload);
  });

  it("should throw errors for invalid input into constructor", () => {
    expect(() => {
      new Attachment("", "");
    }).toThrowError("Type cannot be null or empty");
    expect(() => {
      new Attachment("", DUMMY_ATTACHMENT_1.payload);
    }).toThrowError("Type cannot be null or empty");
    expect(() => {
      new Attachment(DUMMY_ATTACHMENT_1.type, "");
    }).toThrowError("Payload cannot be null or empty");
  });

  it("should return correct values for setters", () => {
    expect(testAttachment.type).toBe(DUMMY_ATTACHMENT_1.type);
    expect(testAttachment.payload).toBe(DUMMY_ATTACHMENT_1.payload);
    testAttachment.type = DUMMY_ATTACHMENT_2.type;
    testAttachment.payload = DUMMY_ATTACHMENT_2.payload;
    expect(testAttachment.type).toBe(DUMMY_ATTACHMENT_2.type);
    expect(testAttachment.payload).toBe(DUMMY_ATTACHMENT_2.payload);
  });

  // This test was generated using GitHub Copilot.
  it("should throw errors for invalid input into setters", () => {
    expect(() => {
      testAttachment.type = "";
    }).toThrowError("Type cannot be null or empty");
    expect(() => {
      testAttachment.payload = "";
    }).toThrowError("Payload cannot be null or empty");
  });

  it("should return correct string representation", () => {
    const expectedString = `Type: ${testAttachment.type}, Payload: ${testAttachment.payload}`;
    expect(testAttachment.toString()).toBe(expectedString);
  });
});
