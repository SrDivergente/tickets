import { describe, it, expect } from 'vitest';
import { Ticket } from '../../../domain/entities/Ticket';

describe("Ticket", () => {

  let ticket = {
    eventCode: 'event-code',
    ownerEmail: 'owner-email',
    ownerName: 'owner-name',
    code: 'ticket-code',
    price: 0
  }

  it("should be able to create a ticket", () => {
    expect(new Ticket(ticket)).toBeTruthy();
    expect(new Ticket(ticket)).toBeInstanceOf(Ticket);
  })

  it("should throw error with invalid data", () => {
    const ticketWithInvalidEventCode = {
      ...ticket,
      eventCode: "",
    };

    const ticketWithInvalidOwnerEmail = {
      ...ticket,
      ownerEmail: "",
    }

    const ticketWithInvalidOwnerName = {
      ...ticket,
      ownerName: "",
    };
    const ticketWithInvalidTicketCode = {
      ...ticket,
      code: ""
    };

    const ticketWithInvalidPrice = {
      ...ticket,
      price: -1
    };

    expect(() => new Ticket(ticketWithInvalidEventCode)).toThrowError();
    expect(() => new Ticket(ticketWithInvalidOwnerName)).toThrowError();
    expect(() => new Ticket(ticketWithInvalidOwnerEmail)).toThrowError();
    expect(() => new Ticket(ticketWithInvalidTicketCode)).toThrowError();
    expect(() => new Ticket(ticketWithInvalidPrice)).toThrowError();
  })
})