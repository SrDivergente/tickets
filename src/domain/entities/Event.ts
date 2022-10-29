import { EventValidation } from "../validation/event-validate";
import { BaseEntity } from "./BaseEntity";

export type EventProps = {
  code: string;
  description: string;
  ticketPrice: number;
};

export class Event extends BaseEntity<EventProps> {
  constructor(props: EventProps, id?: string) {
    EventValidation.EventValidate(props);
    super(props, id);
  }

  get code() {
    return this.props.code;
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get ticketPrice() {
    return this.props.ticketPrice;
  }

  set ticketPrice(price: number) {
    this.props.ticketPrice = price;
  }
}
