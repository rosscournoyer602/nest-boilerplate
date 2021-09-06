import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.findOne(payload.sub);
    if (!user) {
      return new UnauthorizedException({
        description: "Invalid Token",
      });
    }
    if (new Date().getTime() / 1000 > payload.exp) {
      return new UnauthorizedException({
        description: "User token expired",
      });
    }
    return user.username;
  }
}
