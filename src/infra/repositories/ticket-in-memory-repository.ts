import { Ticket } from "../../domain/entities/Ticket";
import { TicketRepository } from "../../domain/repositories/ticket-repository";

export class TicketInMemoryRepository implements TicketRepository {

  tickets: Ticket[] = [];

  async save(ticket: Ticket) {
    this.tickets.push(ticket);
  }

  async get(ticketCode: string) {
    const ticket = this.tickets.find(ticket => ticket.ticketCode == ticketCode);
    if (!ticket) throw new Error("Ticket not found");
    return ticket;
  }

  async delete(ticketCode: string) {
    this.tickets = this.tickets.filter((ticket) => ticket.ticketCode != ticketCode);
  }

}