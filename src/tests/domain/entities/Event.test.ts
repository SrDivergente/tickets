import { describe, it, expect } from "vitest";
import { Event, EventProps } from "../../../domain/entities/Event";

describe("Event entity", () => {
  it("should be able to create a Event instance with valid data", () => {
    const eventProps = {
      code: "code",
      description: "description",
      ticketPrice: 0,
    };

    const event = new Event(eventProps);

    expect(event).toBeTruthy();
    expect(event).toBeInstanceOf(Event);
  });

  it("should throw error with no data", () => {
    expect(() => new Event({} as EventProps)).toBeTruthy();
  });

  it("should throw error with invalid event code", () => {
    const invalidCode = "";

    const eventProps = {
      code: invalidCode,
      description: "valid-description",
      ticketPrice: 0,
    };

    expect(() => new Event(eventProps)).toThrowError();
  });

  it("should throw error with invalid description", () => {
    const invalidDescription = "";

    const eventProps = {
      code: "valid-code",
      description: invalidDescription,
      ticketPrice: 0,
    };

    expect(() => new Event(eventProps)).toThrowError();
  });

  it("should throw error with price lower than 0", () => {
    const invalidPrice = -1;

    const eventProps = {
      code: "valid-code",
      description: "valid-description",
      ticketPrice: invalidPrice,
    };

    expect(() => new Event(eventProps)).toThrowError();
  });

  it("should throw error with price greater than 100", () => {
    const invalidPrice = 101;

    const eventProps = {
      code: "valid-code",
      description: "valid-description",
      ticketPrice: invalidPrice,
    };

    expect(() => new Event(eventProps)).toThrowError();
  });
});
