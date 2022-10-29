import { Ticket } from "../../entities/Ticket";

export type UserCreateInput = {
  name: string;
  email: string;
};

export type GetUserInput = {
  name: string;
  email: string;
};

export type GetUserOutput = {
  name: string;
  email: string;
  tickets: Ticket[];
};

export type DeleteUserInout = {
  name: string;
  email: string;
};
