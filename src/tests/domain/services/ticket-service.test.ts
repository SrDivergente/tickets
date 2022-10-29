import { expect, describe, it, afterAll, beforeAll } from "vitest";
import { randomUUID } from "crypto";
import { EventInMemoryRepository } from "../../../infra/repositories/event-in-memory-repository";
import { TicketInMemoryRepository } from "../../../infra/repositories/ticket-in-memory-repository";
import { TicketService } from "../../../domain/services/ticket-service";
import { UserInMemoryRepository } from "../../../infra/repositories/user-in-memory-repository";
import { User } from "../../../domain/entities/User";
import { Event } from "../../../domain/entities/Event";

const eventRepository = new EventInMemoryRepository();
const ticketRepository = new TicketInMemoryRepository();
const userRepository = new UserInMemoryRepository();

const ticketService = new TicketService(ticketRepository, eventRepository, userRepository);

const fakeUser = {
  name: "fake-name",
  email: "fake-email",
  tickets: [],
};

const fakeEvent = {
  code: "fake-code",
  description: "fake-description",
  ticketPrice: 0,
};

function makeTicketInput(
  code: string,
  ownerEmail: string,
  ownerName: string,
  eventCode: string,
  price: number,
) {
  return { code, ownerEmail, ownerName, eventCode, price };
}

describe("TicketService", async () => {
  beforeAll(async () => {
    await eventRepository.save(new Event(fakeEvent));
    await userRepository.create(new User(fakeUser));
  });

  afterAll(async () => {
    await userRepository.delete(fakeUser.email);
  });

  it("should buy a ticket", async () => {
    const input = makeTicketInput(randomUUID(), fakeUser.email, fakeUser.name, fakeEvent.code, 0);

    await ticketService.purchase(input);

    const output = await ticketService.get(input.code);

    expect(output).toBeTruthy();
    expect(output).toEqual(input);
  });

  it("should delete a ticket", async () => {
    const input = makeTicketInput(randomUUID(), fakeUser.email, fakeUser.name, fakeEvent.code, 0);

    await ticketService.purchase(input);

    const output = await ticketService.get(input.code);

    await ticketService.delete(output.code);

    const promise = ticketService.get(input.code);
    expect(promise).rejects.toThrowError();
  });
});
