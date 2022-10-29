import { describe, expect, it } from 'vitest';
import { User } from '../../../domain/entities/User';

describe("User entity", () => {

  let userProps = {
    name: "name",
    email: "email",
    tickets: []
  }

  it("should be able to create a user", () => {
    expect(new User(userProps)).toBeTruthy();
    expect(new User(userProps)).toBeInstanceOf(User);
  })

  it("should be able to change the user name", () => {
    const user = new User(userProps);
    user.name = "new-name";
    expect(user.name).toBe("new-name");
  })

  it("should be able to change the user email", () => {
    const user = new User(userProps);
    user.email = "new-email";
    expect(user.email).toBe("new-email");
  }) 

  it("should throw error with invalid data", () => {
    const userWithInvalidName = { ...userProps, name: "" };
    const userWithInvalidEmail = { ...userProps, email: "" };

    expect(() => new User(userWithInvalidName)).toThrowError();
    expect(() => new User(userWithInvalidEmail)).toThrowError();
  })
})