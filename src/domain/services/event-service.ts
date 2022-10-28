import { Event } from '../entities/Event';
import { EventRepository } from '../repositories/event-repository';

type CreateEventInput = {
  eventCode: string;
  eventDescription: string;
  eventPrice: number
}

type GetEventOutput = {
  eventCode: string;
  eventDescription: string;
  eventPrice: number
}

type UpdateEventFieldsInput = {
  eventDescription: string;
  eventPrice: number
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
      price: input.eventPrice
    });

    await this.eventRepository.save(event);
  }

  async get(eventCode: string): Promise<GetEventOutput> {
    const event = await this.eventRepository.get(eventCode);

    return {
      eventCode: event.code,
      eventDescription: event.description,
      eventPrice: event.price
    };
  }

  async delete(eventCode: string): Promise<void> {
    await this.eventRepository.delete(eventCode);
  }

  async update(fields: UpdateEventFieldsInput, eventCode: string): Promise<void> {
    await this.eventRepository.update(fields, eventCode);
  }
}