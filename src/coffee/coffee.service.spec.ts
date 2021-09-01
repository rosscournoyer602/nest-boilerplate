import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Flavors } from "../flavors/entities/flavor.entity";
import { Connection, Repository } from "typeorm";
import { CoffeeService } from "./coffee.service";
import { Coffee } from "./entities/coffee.entity";
import { NotFoundException } from "@nestjs/common";

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
});

describe("CoffeeService", () => {
  let service: CoffeeService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeService,
        {
          provide: getRepositoryToken(Flavors),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<CoffeeService>(CoffeeService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should call the find method on the repo", async () => {
      const expectedReturn = [];
      const repoSpy = jest.spyOn(coffeeRepository, "find");
      coffeeRepository.findOne.mockReturnValue(expectedReturn);
      await service.findAll({ limit: 10, offset: 0 });
      expect(repoSpy).toBeCalled();
    });
    it("returns an array of coffees", async () => {
      const expectedReturn = [];
      coffeeRepository.find.mockReturnValue(expectedReturn);
      const coffees = await service.findAll({ limit: 10, offset: 0 });
      expect(coffees).toEqual(expectedReturn);
    });
  });

  describe("findOne", () => {
    describe("when coffee with ID exists", () => {
      it("should call the findOne method on the repo", async () => {
        const coffeeId = "1";
        const expectedCoffee = {};
        const repoSpy = jest.spyOn(coffeeRepository, "findOne");
        coffeeRepository.findOne.mockReturnValue(expectedCoffee);
        await service.findOne(coffeeId);
        expect(repoSpy).toBeCalled();
      });
      it("should return the coffee object", async () => {
        const coffeeId = "1";
        const expectedCoffee = {};

        coffeeRepository.findOne.mockReturnValue(expectedCoffee);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });
    describe("otherwise", () => {
      it("it should throw a NotFoundException", async () => {
        const coffeeId = "1";
        coffeeRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(coffeeId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });
});
