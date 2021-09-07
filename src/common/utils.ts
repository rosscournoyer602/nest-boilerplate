import { MockRepository } from "./types";

const savedUser = {
  username: "test",
  password: "pass123",
};

export const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn().mockReturnValue(savedUser),
});
