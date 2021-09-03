import { Controller, Post, Request, Response, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
