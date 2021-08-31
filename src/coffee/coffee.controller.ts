import { Body, Controller, Get, Post, Param, Patch, Delete, Query } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {
     
  }

  @Get('')
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeeService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeeService.findOne(id);
  }

  @Post('create')
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    this.coffeeService.create(createCoffeeDto);
    return createCoffeeDto ;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    this.coffeeService.update(id, updateCoffeeDto);
    return `Update coffee ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() body) {
    this.coffeeService.remove(id);
    return `Delete coffee ${id}`;
  }
}
 