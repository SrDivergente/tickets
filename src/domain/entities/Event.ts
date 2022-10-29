import { BaseEntity } from "./BaseEntity";

export type EventProps = {
  code: string;
  description: string;
  ticketPrice: number;
};

export class Event extends BaseEntity<EventProps> {
  constructor(props: EventProps, id?: string) {
    if (!props.code) throw new Error("Code can't be blank.");

    if (!props.description) throw new Error("Description can't be blank.");

    if (props.ticketPrice < 0 || props.ticketPrice > 100)
      throw new Error("The ticket price must be greater than 0 and lower than 100");

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
