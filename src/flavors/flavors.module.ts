import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flavors } from './entities/flavor.entity';
import { FlavorsController } from './flavors.controller';
import { FlavorsService } from './flavors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Flavors])],
  controllers: [FlavorsController],
  providers: [FlavorsService]
})
export class FlavorsModule {}
