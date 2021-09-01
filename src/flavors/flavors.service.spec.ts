import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Flavors } from "./entities/flavor.entity";
import { FlavorsService } from "./flavors.service";

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe("FlavorsService", () => {
  let service: FlavorsService;
  let flavorsRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlavorsService,
        {
          provide: getRepositoryToken(Flavors),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<FlavorsService>(FlavorsService);
    flavorsRepository = module.get<MockRepository>(getRepositoryToken(Flavors));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
