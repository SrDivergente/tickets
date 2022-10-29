import { randomUUID } from "crypto";

export class BaseEntity<EntityProps> {
  protected props: EntityProps;
  private id: string;

  constructor(props: EntityProps, id?: string) {
    this.props = props;
    this.id = id ?? randomUUID();
  }
}