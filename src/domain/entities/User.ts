import { BaseEntity } from "./BaseEntity";
import { Ticket } from "./Ticket";
import UserValidation from "../validation/user-validate";
type UserProps = {
  name: string;
  email: string;
  tickets: Ticket[];
};

export class User extends BaseEntity<UserProps> {
  constructor(props: UserProps, id?: string) {
    UserValidation.userValidate(props);
    super(props, id);
  }

  get name() {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }

  get email() {
    return this.props.email;
  }
  set email(email: string) {
    this.props.email = email;
  }

  get tickets() {
    return this.props.tickets;
  }
}
