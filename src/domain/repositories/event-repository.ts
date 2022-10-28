import { Event, EventProps } from "../entities/Event";

export type UpdateFields = {
  eventDescription: string;
  eventPrice: number
}

export interface EventRepository {
  save(event: Event): Promise<void>;
  get(eventCode: string): Promise<Event>;
  delete(eventCode: string): Promise<void>;
  update(fields: UpdateFields, eventCode: string): Promise<void>;
}