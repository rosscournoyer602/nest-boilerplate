import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Flavors } from "./entities/flavor.entity";

@Injectable()
export class FlavorsService {
  constructor(
    @InjectRepository(Flavors)
    private readonly flavorRepository: Repository<Flavors>,
  ) {}

  async findAll() {
    return await this.flavorRepository.find();
  }
}
