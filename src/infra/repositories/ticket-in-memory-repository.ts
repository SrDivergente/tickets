import { Ticket } from "../../domain/entities/Ticket";
import { TicketRepository, UpdateTicketFields } from '../../domain/repositories/ticket-repository';

export class TicketInMemoryRepository implements TicketRepository {

  tickets: Ticket[] = [];

  async save(ticket: Ticket) {
    this.tickets.push(ticket);
  }

  async get(code: string) {
    const ticket = this.tickets.find(ticket => ticket.code == code);
    return ticket;
  }

  async delete(code: string) {
    this.tickets = this.tickets.filter((ticket) => ticket.code != code);
  }

  async update(fields: UpdateTicketFields, code: string) {
    let ticket = await this.get(code);

    if (ticket) {
      ticket.ownerEmail = fields.ownerEmail ?? ticket.ownerEmail;
      ticket.price = fields.price ?? ticket.price;
    }
  }

}