import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Body() login: LoginDto) {
    try {
      Body;
      return { token: this.authService.generateToken(login.username) };
    } catch (err) {
      return err;
    }
  }

  @Post("register")
  async register(@Body() register: CreateAuthDto, @Response() res) {
    try {
      const token = await this.authService.create(register);
      res.status(201).send(token);
    } catch (err) {
      res.status(400).send(err);
    }
  }
}
