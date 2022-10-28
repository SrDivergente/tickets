import { Event, EventProps } from "../entities/Event";

export interface EventRepository {
  save(event: Event): Promise<void>;
  get(eventCode: string): Promise<Event>;
  delete(eventCode: string): Promise<void>;
}