import { describe, it, expect } from 'vitest';
import { UserService } from '../../../domain/services/user-service';
import { UserInMemoryRepository } from '../../../infra/repositories/user-in-memory-repository';

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
})