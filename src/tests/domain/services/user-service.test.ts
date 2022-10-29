import { describe, it, expect } from 'vitest';
import { UserService } from '../../../domain/services/user-service';
import { UserInMemoryRepository } from '../../user-in-memory-repository';

describe("User service", () => {
  const userRepository = new UserInMemoryRepository();
  const userService = new UserService(userRepository);

  it("should be able to create a user", async () => {
    const input = {
      name: "name",
      email: "email",
      tickets: []
    }

    await userService.create(input);

    const output = await userService.get(input);

    expect(output).toBeTruthy();
    expect(output).toEqual(input);
  })

  it("should throw error when trying to create a user with invalid data", async () => {
    const input = {
      name: "valid-name",
      email: "valid-email",
    }

    const inputWithInvalidName = {
      ...input,
      name: ""
    }

    const inputWithInvalidEmail = {
      ...input,
      email: ""
    }

    expect(() => userService.create(inputWithInvalidEmail)).rejects.toThrowError();
    expect(() => userService.create(inputWithInvalidName)).rejects.toThrowError();

  })

  it("should be able to delete a user", async () => {
    const input = {
      name: "user-to-be-deleted-name",
      email: "user-to-be-deleted-email",
      tickets: []
    }

    await userService.create(input);

    const output = await userService.get(input);

    await userService.delete(output);

    const promise = userService.get(output);

    expect(promise).rejects.toThrowError();
  })
})