import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>
  ) {}

  findAll() {
    return this.coffeeRepository.find();
  }

  findOne(id: string) {
    const coffee = this.coffeeRepository.findOne(id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    } else {
      return coffee;
    }
  }

  create(createCoffeeDto: any) {
    this.coffeeRepository.save(createCoffeeDto);
    return createCoffeeDto;
  }

  update(id: string, updateCoffeeDto: any) {
    this.coffeeRepository.update(id, updateCoffeeDto)

  }

  remove(id: string) {
    this.coffeeRepository.delete(id);
  }
}
