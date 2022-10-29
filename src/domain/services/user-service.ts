import { User } from "../entities/User";
import { UserRepository } from "../repositories/user-repository";
import {
  DeleteUserInout,
  GetUserInput,
  GetUserOutput,
  UserCreateInput,
} from "./types/";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async get(input: GetUserInput): Promise<GetUserOutput> {
    const user = await this.userRepository.get(input.email);

    if (!user) throw new Error("User not found");

    return {
      name: user.name,
      email: user.email,
      tickets: user.tickets ?? [],
    };
  }

  async create(input: UserCreateInput) {
    const userExists = await this.userRepository.get(input.email);

    if (userExists) throw new Error("User already exists.");

    const user = new User({ ...input, tickets: [] });

    await this.userRepository.create(user);
  }

  async delete(input: DeleteUserInout) {
    const user = await this.userRepository.get(input.email);

    if (!user) throw new Error("User not found");

    await this.userRepository.delete(input.email);
  }
}
