import { Event } from "../entities/Event";
import { EventRepository } from "../repositories/event-repository";

import {
  CreateEventInput,
  GetEventOutput,
  UpdateEventFieldsInput,
} from "./types/";

export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async create(input: CreateEventInput): Promise<void> {
    const eventExists = await this.eventRepository.get(input.eventCode);

    if (eventExists) throw new Error("Event already exists");

    const event = new Event({
      code: input.eventCode,
      description: input.eventDescription,
      ticketPrice: input.eventTicketPrice,
    });

    await this.eventRepository.save(event);
  }

  async get(eventCode: string): Promise<GetEventOutput> {
    if (!eventCode) throw new Error("Code can't be empty");

    const event = await this.eventRepository.get(eventCode);
    if (!event) throw new Error("Event not found.");
    return {
      eventCode: event.code,
      eventDescription: event.description,
      eventTicketPrice: event.ticketPrice,
    };
  }

  async delete(eventCode: string): Promise<void> {
    const event = await this.eventRepository.get(eventCode);
    if (!event) throw new Error("Event not found.");
    await this.eventRepository.delete(eventCode);
  }

  async update(fields: UpdateEventFieldsInput, eventCode: string): Promise<void> {
    if (!fields.eventDescription) throw new Error("Invalid event description");
    if (!fields.eventTicketPrice) throw new Error("Invalid event ticket price");

    await this.eventRepository.update(fields, eventCode);
  }

}
