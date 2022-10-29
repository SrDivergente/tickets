import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/user-repository";

export class UserInMemoryRepository implements UserRepository {
  users: User[] = [];

  async get(email: string) {
    return this.users.find((user) => user.email == email);
  }

  async create(user: User) {
    this.users.push(user);
  }

  async delete(email: string) {
    this.users = this.users.filter((user) => user.email != email);
  }
}