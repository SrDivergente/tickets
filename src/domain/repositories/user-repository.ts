import { User } from "../entities/User";

export interface UserRepository {
  get(email: string): Promise<User | undefined>;
  create(user: User): Promise<void>;
}