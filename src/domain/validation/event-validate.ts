import EmptyValidation from "./empty-validate";

type EventProps = {
  code: string;
  description: string;
  ticketPrice: number;
};

export class EventValidation extends EmptyValidation {
  static EventValidate(props: EventProps) {
    super.emptyValidate(props);
    if (props.ticketPrice > 100 || props.ticketPrice < 0) {
      throw new Error(
        "The ticket price must be greater than 0 and lower than 100"
      );
    }
  }
}
