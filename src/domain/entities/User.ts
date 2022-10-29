import { BaseEntity } from "./BaseEntity";
import { Ticket } from './Ticket';

type UserProps = {
  name: string;
  email: string;
  tickets: Ticket[];
}

export class User extends BaseEntity<UserProps> {
  constructor(props: UserProps, id?: string) {

    if (!props.name) throw new Error("Invalid name");
    if (!props.email) throw new Error("Invalid email");

    super(props, id);
  }

  get name() { return this.props.name }
  set name(name: string) { this.props.name = name }
  
  get email() { return this.props.email }
  set email(email: string) { this.props.email = email }

  get tickets() { return this.props.tickets }
}