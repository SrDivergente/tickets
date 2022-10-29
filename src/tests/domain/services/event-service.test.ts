import { describe, it } from "vitest";
import { EventInMemoryRepository } from "../../../infra/repositories/event-in-memory-repository";
import { expect } from "vitest";
import { EventService } from "../../../domain/services/event-service";
import { randomUUID } from "crypto";

describe("EventService", () => {
  const eventRepository = new EventInMemoryRepository();
  const eventService = new EventService(eventRepository);

  it("should be able to create a event", async () => {
    const input = {
      eventCode: randomUUID(),
      eventDescription: "event-description",
      eventTicketPrice: 0,
    };

    await eventService.create(input);
    const output = await eventService.get(input.eventCode);

    expect(output).toBeTruthy();
    expect(input).toEqual(output);
  });

  it("should throw error when trying to create a event that already exists", async () => {
    const input = {
      eventCode: "event-code",
      eventDescription: "event-description",
      eventTicketPrice: 0,
    };
  });

  it("should throw error when trying to create a event with invalid data", async () => {
    const inputWithInvalidEventCode = {
      eventCode: "",
      eventDescription: "valid-event-description",
      eventTicketPrice: 0,
    };

    const inputWithInvalidEventDescription = {
      eventCode: "valid-event-code",
      eventDescription: "",
      eventTicketPrice: 0,
    };

    const inputWithInvalidEventTicketPrice = {
      eventCode: "valid-event-code",
      eventDescription: "valid-event-description",
      eventTicketPrice: -1,
    };

    expect(() =>
      eventService.create(inputWithInvalidEventCode)
    ).rejects.toThrowError();
    expect(() =>
      eventService.create(inputWithInvalidEventDescription)
    ).rejects.toThrowError();
    expect(() =>
      eventService.create(inputWithInvalidEventTicketPrice)
    ).rejects.toThrowError();
  });

  it("should be able to delete a event", async () => {
    const input = {
      eventCode: randomUUID(),
      eventDescription: "event-description",
      eventTicketPrice: 0,
    };

    await eventService.create(input);

    const output = await eventService.get(input.eventCode);

    await eventService.delete(output.eventCode);

    const promise = eventService.get(output.eventCode);
    expect(promise).rejects.toThrowError();
  });

  it("should be able to update a event", async () => {
    const input = {
      eventCode: randomUUID(),
      eventDescription: "event-description",
      eventTicketPrice: 0,
    };

    await eventService.create(input);

    const output = await eventService.get(input.eventCode);

    await eventService.update(
      {
        eventDescription: "new-event-description",
        eventTicketPrice: 1,
      },
      output.eventCode
    );

    const updatedEvent = await eventService.get(input.eventCode);

    expect(updatedEvent.eventDescription).not.equal(input.eventDescription);
    expect(updatedEvent.eventTicketPrice).not.equal(input.eventTicketPrice);
  });
});
