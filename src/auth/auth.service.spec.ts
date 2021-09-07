import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { MockRepository } from "../common/types";
import { createMockRepository } from "../common/utils";
import { Connection } from "typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Auth } from "./entities/auth.entity";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { ConfigService } from "@nestjs/config";
import { userInfo } from "os";

const newUser: CreateAuthDto = {
  username: "testuser",
  password: "pass123",
  confirmPassword: "pass123",
};

const findUserReturn = {
  username: "testuser",
};

type SaveUserReturn = {
  username: string;
  token: string;
};

describe("AuthService", () => {
  let service: AuthService;
  let repo: MockRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(Auth), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repo = module.get<MockRepository>(getRepositoryToken(Auth));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findOne", () => {
    it("should call findOne on the repository", async () => {
      const spy = jest.spyOn(repo, "findOne");
      repo.findOne.mockReturnValue({});
      const result = await service.findOne("testuser");
      expect(result).toEqual({});
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe("create", () => {
    it("should call create on the repository", async () => {
      const spy = jest.spyOn(repo, "save");
      repo.save.mockReturnValue(findUserReturn);
      repo.findOne.mockReturnValue(undefined);
      const createUser = await service.create(newUser);
      expect(spy).toBeCalledTimes(1);
      expect(createUser).toBeDefined();
    });
  });
});
