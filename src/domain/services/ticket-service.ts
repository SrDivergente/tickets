import { Ticket } from '../entities/Ticket';
import { EventRepository } from '../repositories/event-repository';
import { TicketRepository } from '../repositories/ticket-repository';
import { UserRepository } from '../repositories/user-repository';

type PurchaseTicketInput = {
  ticketCode: string;
  ownerName: string;
  ownerEmail: string;
  eventCode: string;
};

export class TicketService {

  constructor(
    private ticketRepository: TicketRepository, 
    private eventRepository: EventRepository,
    private userRepository: UserRepository
  ) {}

  async purchase(input: PurchaseTicketInput) {
    const eventExists = await this.eventRepository.get(input.eventCode);

    if (!eventExists) throw new Error("Event not found.");

    const userExists = await this.userRepository.get(input.ownerEmail);

    if (!userExists) throw new Error("User not found.");

    const ticket = new Ticket(input);
    userExists.tickets.push(ticket);

    await this.ticketRepository.save(ticket);
  }

  async get(ticketCode: string) {

    if (!ticketCode) throw new Error("Ticket code can't be empty");

    const ticket = await this.ticketRepository.get(ticketCode);

    if (!ticket) throw new Error("Ticket not found.");

    return {
      eventCode: ticket.eventCode,
      ownerEmail: ticket.ownerEmail,
      ownerName: ticket.ownerName,
      ticketCode: ticket.ticketCode
    };
  }

  async delete(ticketCode: string) {
    if (!ticketCode) throw new Error("Ticket code can't be empty");
    const ticket = await this.ticketRepository.get(ticketCode);
    if (!ticket) throw new Error("Ticket not found.");
    this.ticketRepository.delete(ticket.ticketCode);
  }

}