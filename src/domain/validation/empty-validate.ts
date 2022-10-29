export default class EmptyValidation {
  static emptyValidate(props: Object) {
    for (const [key, value] of Object.entries(props)) {
      if (typeof value === "number") {
        continue;
      }
      if (!value) {
        throw new Error(`${key} can't be blank.`);
      }
    }
  }
}
