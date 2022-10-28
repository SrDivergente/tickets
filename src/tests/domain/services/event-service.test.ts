import { describe, it } from "vitest";
import { EventInMemoryRepository } from "../../../infra/repositories/event-in-memory-repository";
import { expect } from 'vitest';
import { EventService } from "../../../domain/services/event-service";
import { randomUUID } from "crypto";

describe("EventService", () => {
  const eventRepository = new EventInMemoryRepository();
  const eventService = new EventService(eventRepository);

  it("should be able to create a event", async () => {
    const input = {
      eventCode: randomUUID(),
      eventDescription: "event-description",
      eventPrice: 0
    }

    await eventService.create(input);
    const output = await eventService.get(input.eventCode);

    expect(output).toBeTruthy();
    expect(input).toEqual(output);
  })

  it("should throw error with invalid event code", async () => {
    const input = {
      eventCode: "",
      eventDescription: "event-description",
      eventPrice: 0
    }

    const promise = eventService.create(input);

    expect(promise).rejects.toThrowError();
  })

  it("should be able to delete a event", async () => {
    const input = {
      eventCode: randomUUID(),
      eventDescription: "event-description",
      eventPrice: 0
    }

    await eventService.create(input);

    const output = await eventService.get(input.eventCode);

    await eventService.delete(output.eventCode);

    const promise = eventService.get(output.eventCode);
    expect(promise).rejects.toThrowError();
  })

  it("should be able to update a event", async () => {

    const input = {
      eventCode: randomUUID(),
      eventDescription: "event-description",
      eventPrice: 0
    }

    await eventService.create(input);

    const output = await eventService.get(input.eventCode);

    await eventService.update({
      eventDescription: "new-event-description",
      eventPrice: 1
    }, output.eventCode);

    const updatedEvent = await eventService.get(input.eventCode);

    expect(updatedEvent.eventDescription).not.equal(input.eventDescription);
    expect(updatedEvent.eventPrice).not.equal(input.eventPrice);

  })
})