import { Event } from '../entities/Event';
import { EventRepository } from '../repositories/event-repository';

type CreateEventInput = {
  eventCode: string;
  eventDescription: string;
  eventTicketPrice: number
}

type GetEventOutput = {
  eventCode: string;
  eventDescription: string;
  eventTicketPrice: number
}

type UpdateEventFieldsInput = {
  eventDescription: string;
  eventTicketPrice: number
}

export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async create(input: CreateEventInput): Promise<void> {

    if (!input.eventCode) {
      throw new Error("Invalid event code");
    }

    const event = new Event({
      code: input.eventCode,
      description: input.eventDescription,
      ticketPrice: input.eventTicketPrice
    });

    await this.eventRepository.save(event);
  }

  async get(eventCode: string): Promise<GetEventOutput> {
    const event = await this.eventRepository.get(eventCode);

    return {
      eventCode: event.code,
      eventDescription: event.description,
      eventTicketPrice: event.ticketPrice
    };
  }

  async delete(eventCode: string): Promise<void> {
    await this.eventRepository.delete(eventCode);
  }

  async update(fields: UpdateEventFieldsInput, eventCode: string): Promise<void> {
    await this.eventRepository.update(fields, eventCode);
  }
}