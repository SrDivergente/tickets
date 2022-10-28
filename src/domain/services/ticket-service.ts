import { Ticket } from '../entities/Ticket';
import { EventRepository } from '../repositories/event-repository';
import { TicketRepository } from '../repositories/ticket-repository';

type PurchaseTicketInput = {
  ticketCode: string;
  ownerName: string;
  ownerEmail: string;
  eventCode: string;
};

type Promise<GetTicketOutput> = {
  ticketCode: string;
  ownerEmail: string;
  ownerName: string;
  eventCode: string;
};

export class TicketService {

  constructor(
    private ticketRepository: TicketRepository, 
    private eventRepository: EventRepository
  ) {}

  async purchase(input: PurchaseTicketInput) {
    const eventExists = this.eventRepository.get(input.eventCode);

    if (!eventExists) throw new Error("Event not found.");

    const ticket = new Ticket(input);

    this.ticketRepository.save(ticket);
  }

  async get(ticketCode: string) {
    const ticket = await this.ticketRepository.get(ticketCode);

    return {
      eventCode: ticket.eventCode,
      ownerEmail: ticket.ownerEmail,
      ownerName: ticket.ownerName,
      ticketCode: ticket.ticketCode
    };
  }

  async delete(ticketCode: string) {
    const ticket = await this.ticketRepository.get(ticketCode);
    this.ticketRepository.delete(ticket.ticketCode);
  }

}