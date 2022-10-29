import TicketValidation from "../validation/ticket-validate";
import { BaseEntity } from "./BaseEntity";

export type TicketProps = {
  ticketCode: string;
  ownerName: string;
  ownerEmail: string;
  eventCode: string;
};

export class Ticket extends BaseEntity<TicketProps> {
  constructor(props: TicketProps, id?: string) {
    TicketValidation.TicketValidate(props);
    super(props, id);
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
