import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiHeaders } from "@nestjs/swagger";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  hello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("Authorization")
  @Get("protected")
  protectedHello(): string {
    return this.appService.protectedHello();
  }
}
