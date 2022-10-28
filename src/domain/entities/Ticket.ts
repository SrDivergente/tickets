
export type TicketProps = {
  ticketCode: string;
  ownerName: string;
  ownerEmail: string;
  eventCode: string;
}

export class Ticket {
  private props: TicketProps;

  constructor(props: TicketProps) {
    this.props = props;
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