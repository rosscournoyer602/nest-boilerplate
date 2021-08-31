import { Controller, Get } from "@nestjs/common";
import { FlavorsService } from "./flavors.service";

@Controller("flavors")
export class FlavorsController {
  constructor(private readonly flavorsService: FlavorsService) {}

  @Get("")
  findAll() {
    return this.flavorsService.findAll();
  }
}
