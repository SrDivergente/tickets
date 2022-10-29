import { Ticket } from '../entities/Ticket';
import { EventRepository } from '../repositories/event-repository';
import { TicketRepository } from '../repositories/ticket-repository';
import { UserRepository } from '../repositories/user-repository';

type PurchaseTicketInput = {
  code: string;
  ownerName: string;
  ownerEmail: string;
  eventCode: string;
  price: number;
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

  async get(code: string) {

    if (!code) throw new Error("Ticket code can't be empty");

    const ticket = await this.ticketRepository.get(code);

    if (!ticket) throw new Error("Ticket not found.");

    return {
      eventCode: ticket.eventCode,
      ownerEmail: ticket.ownerEmail,
      ownerName: ticket.ownerName,
      code: ticket.code,
      price: ticket.price
    };
  }

  async delete(code: string) {

    if (!code) throw new Error("Ticket code can't be empty");

    const ticket = await this.ticketRepository.get(code);

    if (!ticket) throw new Error("Ticket not found.");

    this.ticketRepository.delete(ticket.code);
  }

  async changeOwner(code: string, toEmail: string) {
    const ticket = await this.ticketRepository.get(code);

    if (!ticket) throw new Error("Ticket not found");

    this.ticketRepository.update({
      ownerEmail: toEmail
    }, ticket.code);

  }

}