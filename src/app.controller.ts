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
  async register(@Request() req, @Response() res) {
    const { body } = req;
    try {
      const token = await this.authService.create(body);
      res.status(201).send(token);
    } catch (err) {
      res.status(400).send(err);
    }
  }
}
