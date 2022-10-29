import { expect, describe, it, afterAll, beforeAll } from "vitest";
import { randomUUID } from "crypto";
import { EventInMemoryRepository } from "../../../infra/repositories/event-in-memory-repository";
import { TicketInMemoryRepository } from "../../../infra/repositories/ticket-in-memory-repository";
import { TicketService } from "../../../domain/services/ticket-service";
import { UserInMemoryRepository } from "../../user-in-memory-repository";
import { User } from "../../../domain/entities/User";
import { Event } from "../../../domain/entities/Event";

const eventRepository = new EventInMemoryRepository();
const ticketRepository = new TicketInMemoryRepository();
const userRepository = new UserInMemoryRepository();

const ticketService = new TicketService(
  ticketRepository,
  eventRepository,
  userRepository
);

const fakeUser = {
  name: "fake-name",
  email: 'fake-email',
  tickets: []
}

const fakeEvent = {
  code: 'fake-code',
  description: 'fake-description',
  ticketPrice: 0
}

describe("TicketService", async () => {

  beforeAll(async () => {
    await eventRepository.save(new Event(fakeEvent));
    await userRepository.create(new User(fakeUser));
  })

  afterAll(async () => {
    await userRepository.delete(fakeUser.email);
  })

  it("should buy a ticket", async () => {
    const input = {
      ticketCode: randomUUID(),
      ownerEmail: fakeUser.email,
      ownerName: fakeUser.name,
      eventCode: fakeEvent.code,
    };

    await ticketService.purchase(input);

    const output = await ticketService.get(input.ticketCode);

    expect(output).toBeTruthy();
    expect(output).toEqual(input);
  });

  it("should delete a ticket", async () => {

    const input = {
      ticketCode: randomUUID(),
      ownerEmail: fakeUser.email,
      ownerName: fakeUser.name,
      eventCode: fakeEvent.code,
    };

    await ticketService.purchase(input);

    const output = await ticketService.get(input.ticketCode);

    await ticketService.delete(output.ticketCode);

    const promise = ticketService.get(input.ticketCode);
    expect(promise).rejects.toThrowError();
  });
});
