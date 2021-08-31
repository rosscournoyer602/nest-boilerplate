import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Coffee } from "./entities/coffee.entity";
import { Flavors } from "../flavors/entities/flavor.entity";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavors)
    private readonly flavorRepository: Repository<Flavors>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } =  paginationQuery;
    return await this.coffeeRepository.find({
      relations: ["flavors"],
      skip: offset,
      take: limit
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne(id, {
      relations: ["flavors"],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    } else {
      return coffee;
    }
  }

  async create(createCoffeeDto: any) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
    );
    const coffee = this.coffeeRepository.create({ ...createCoffeeDto, flavors });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: any) {
    const flavors = updateCoffeeDto.flavors && await Promise.all(
      updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
    );
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavors> {
    const existingFlavor = await this.flavorRepository.findOne({ name });
    if (existingFlavor) {
      return existingFlavor;
    }

    return await this.flavorRepository.save({ name });
  }
}
