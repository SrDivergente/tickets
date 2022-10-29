import { Event } from "../entities/Event";

export type UpdateFields = {
  eventDescription: string;
  eventTicketPrice: number
}

export interface EventRepository {
  save(event: Event): Promise<void>;
  get(eventCode: string): Promise<Event | undefined>;
  delete(eventCode: string): Promise<void>;
  update(fields: UpdateFields, eventCode: string): Promise<void>;
}