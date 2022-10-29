import { Event } from "../../domain/entities/Event";
import { EventRepository, UpdateFields } from '../../domain/repositories/event-repository';

export class EventInMemoryRepository implements EventRepository {
  events: Event[] = [];

  async save(event: Event) {
    this.events.push(event);
  }

  async get(eventCode: string) {
    const event = this.events.find(event => event.code == eventCode);
    if (!event) throw new Error("Event not found");
    return event;
  }

  async delete(eventCode: string) {
    this.events = this.events.filter((event) => event.code != eventCode);
  }

  async update(fields: UpdateFields, eventCode: string) {
    const event = await this.get(eventCode);

    event.description = fields.eventDescription;
    event.ticketPrice = fields.eventTicketPrice;
  }
}