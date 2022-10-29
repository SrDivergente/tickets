import { Ticket } from "../entities/Ticket";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/user-repository";

type UserCreateInput = {
  name: string;
  email: string;
}

type GetUserInput = {
  name: string;
  email: string;
}

type GetUserOutput = {
  name: string;
  email: string;
  tickets: Ticket[];
}

export class UserService { 

  constructor(
    private userRepository: UserRepository, 
  ) {}
  
  async get(input: GetUserInput): Promise<GetUserOutput> {
    const user = await this.userRepository.get(input.email);

    if (!user) throw new Error("User not found")

    return {
      name: user.name,
      email: user.email,
      tickets: user.tickets ?? []
    }
  }

  async create(input: UserCreateInput) {
    const userExists = await this.userRepository.get(input.email);

    if (userExists) throw new Error("User already exists.");

    const user = new User(input);

    await this.userRepository.create(user);
  }
}