import TicketValidation from "../validation/ticket-validate";
import { BaseEntity } from "./BaseEntity";

export type TicketProps = {
  code: string;
  ownerName: string;
  ownerEmail: string;
  eventCode: string;
  price: number;
};

export class Ticket extends BaseEntity<TicketProps> {
  constructor(props: TicketProps, id?: string) {
    if (!props.code) throw new Error("Invalid ticket code");
    if (!props.ownerName) throw new Error("Invalid owner name");
    if (!props.ownerEmail) throw new Error("Invalid owner email");
    if (!props.eventCode) throw new Error("Invalid event code");
    if (props.price < 0 || props.price > 100)
      throw new Error("Invalid ticket price");

    super(props, id);
  }

  get code() {
    return this.props.code;
  }

  get ownerName() {
    return this.props.ownerName;
  }

  set ownerName(ownerName: string) {
    this.props.ownerName = ownerName;
  }

  get ownerEmail() {
    return this.props.ownerEmail;
  }
  get price() {
    return this.props.price;
  }
  set price(price: number) {
    this.props.price = price;
  }
  set ownerEmail(ownerEmail: string) {
    this.props.ownerEmail = ownerEmail;
  }

  get eventCode() {
    return this.props.eventCode;
  }
}
