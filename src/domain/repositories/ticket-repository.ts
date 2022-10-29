import { Ticket } from '../entities/Ticket';

type UpdateTicketFields = {
  ownerEmail?: string;
  price?: number;
}

export interface TicketRepository {
  save(ticket: Ticket): Promise<void>;
  get(ticketCode: string): Promise<Ticket | undefined>;
  delete(ticketCode: string): Promise<void>;
  update(fields: UpdateTicketFields, ticketCode: string): Promise<void>;
}