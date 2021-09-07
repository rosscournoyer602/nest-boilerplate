import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
const bcrypt = require("bcrypt");

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "username",
    });
  }

  async validate(username: string, password: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const user = await this.authService.findOne(username);
      if (!user) {
        reject(new UnauthorizedException({ description: "Invalid Username" }));
      }
      bcrypt.compare(password, user.password, (err, compare: boolean) => {
        if (err) {
          reject(
            new InternalServerErrorException({
              description: "Failed to validate password",
            }),
          );
        }
        if (compare !== true) {
          reject(
            new UnauthorizedException({ description: "Invalid Password" }),
          );
        }
        if (compare === true) {
          resolve(user);
        }
      });
    });
  }
}
