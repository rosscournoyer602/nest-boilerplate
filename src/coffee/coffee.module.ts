import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeeController } from "./coffee.controller";
import { CoffeeService } from "./coffee.service";
import { Coffee } from "./entities/coffee.entity";
import { Flavors } from "../flavors/entities/flavor.entity";
import { Event } from "../events/entities/event.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavors, Event])],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class CoffeeModule {}
