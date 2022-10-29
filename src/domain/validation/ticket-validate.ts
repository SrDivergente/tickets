import EmptyValidation from "./empty-validate";

export type TicketProps = {
  ticketCode: string;
  ownerName: string;
  ownerEmail: string;
  eventCode: string;
};

export default class TicketValidation extends EmptyValidation {
  static TicketValidate(props: TicketProps) {
    super.emptyValidate(props);
  }
}
