import EmptyValidation from "./empty-validate";
type UserProps = {
  name: string;
  email: string;
};

export default class UserValidation extends EmptyValidation {
  static userValidate(props: UserProps) {
    super.emptyValidate(props);
  }
}
