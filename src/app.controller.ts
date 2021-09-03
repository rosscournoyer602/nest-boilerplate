import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  hello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard("local"))
  @Post("auth/login")
  async login(@Request() req) {
    try {
      return { token: this.authService.generateToken(req.body.username) };
    } catch (err) {
      return err;
    }
  }

  @Post("auth/register")
  async register(@Request() req) {
    const { body } = req;
    try {
      return await this.authService.create(body);
    } catch (err) {
      return err;
    }
  }
}
