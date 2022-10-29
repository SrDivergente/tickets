import { BaseEntity } from "./BaseEntity";

export type TicketProps = {
  ticketCode: string;
  ownerName: string;
  ownerEmail: string;
  eventCode: string;
}

export class Ticket extends BaseEntity<TicketProps> {

  constructor(props: TicketProps, id?: string) {

    if (!props.ticketCode) throw new Error("Invalid ticket code");
    if (!props.ownerName) throw new Error("Invalid owner name");
    if (!props.ownerEmail) throw new Error("Invalid owner email");
    if (!props.eventCode) throw new Error("Invalid event code");

    super(props, id)
  }

  get ticketCode() {
    return this.props.ticketCode;
  }

  get ownerName() {
    return this.props.ownerName;
  }

  get ownerEmail() {
    return this.props.ownerEmail;
  }

  get eventCode() {
    return this.props.eventCode;
  }
}