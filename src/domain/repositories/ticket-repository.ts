import { Ticket } from '../entities/Ticket';

export interface TicketRepository {
  save(ticket: Ticket): Promise<void>;
  get(ticketCode: string): Promise<Ticket>;
  delete(ticketCode: string): Promise<void>;
}