import { describe, it } from "vitest";
import { EventInMemoryRepository } from "../../infra/repositories/event-in-memory-repository";
import { expect } from 'vitest';
import { EventService } from "./event-service";
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

  it("should be able to delete a event", async () => {
    const input = {
      eventCode: randomUUID(),
      eventDescription: "event-description",
      eventPrice: 0
    }

    await eventService.create(input);

    const output = await eventService.get(input.eventCode);

    await eventService.delete(output.eventCode);

    expect();
  })
})