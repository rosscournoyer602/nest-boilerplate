import { Repository } from "typeorm";

export type AuthUserResponse = {
  token: string;
};

export type Login = {
  username: string;
  password: string;
};

export type MockRepository<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;
