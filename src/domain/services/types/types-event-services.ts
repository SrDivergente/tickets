export type CreateEventInput = {
  eventCode: string;
  eventDescription: string;
  eventTicketPrice: number;
};

export type GetEventOutput = {
  eventCode: string;
  eventDescription: string;
  eventTicketPrice: number;
};

export type UpdateEventFieldsInput = {
  eventDescription: string;
  eventTicketPrice: number;
};
