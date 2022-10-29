export type PurchaseTicketInput = {
  ticketCode: string;
  ownerName: string;
  ownerEmail: string;
  eventCode: string;
};

export type Promise<GetTicketOutput> = {
  ticketCode: string;
  ownerEmail: string;
  ownerName: string;
  eventCode: string;
};
