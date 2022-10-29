import { expect, describe, it } from "vitest";
import { randomUUID } from "crypto";
import { Event } from "../../../domain/entities/Event";
import { EventInMemoryRepository } from "../../../infra/repositories/event-in-memory-repository";
import { TicketInMemoryRepository } from "../../../infra/repositories/ticket-in-memory-repository";
import { TicketService } from "../../../domain/services/ticket-service";

describe("TicketService", async () => {
  const eventRepository = new EventInMemoryRepository();
  const ticketRepository = new TicketInMemoryRepository();
  const ticketService = new TicketService(ticketRepository, eventRepository);

  const event = new Event({
    code: "event-code",
    description: "event-description",
    ticketPrice: 100,
  });

  await eventRepository.save(event);

  it("should buy a ticket", async () => {
    const input = {
      ticketCode: randomUUID(),
      ownerEmail: "owner-email",
      ownerName: "owner-name",
      eventCode: event.code,
    };

    await ticketService.purchase(input);

    const output = await ticketService.get(input.ticketCode);

    expect(output).toBeTruthy();
    expect(output).toEqual(input);
  });

  it("should delete a ticket", async () => {

    const input = {
      ticketCode: randomUUID(),
      ownerEmail: "owner-email",
      ownerName: "owner-name",
      eventCode: event.code,
    };

    await ticketService.purchase(input);

    const output = await ticketService.get(input.ticketCode);

    await ticketService.delete(output.ticketCode);

    const promise = ticketService.get(input.ticketCode);
    expect(promise).rejects.toThrowError();
  });
});
