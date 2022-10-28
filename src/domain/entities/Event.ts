
export type EventProps = {
  code: string;
  description: string;
  price: number;
};

export class Event {
  private props: EventProps;

  constructor(props: EventProps) {
    this.props = props;
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

  get price() {
    return this.props.price;
  }

  set price(price: number) {
    this.props.price = price;
  }
}
