import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import bcrypt from "bcrypt";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password): Promise<any> {
    const user = await this.authService.findOne(username);
    if (!user) {
      throw new UnauthorizedException({ description: "Invalid Username" });
    }
    bcrypt.compare(password, user.password, (err, compare: boolean) => {
      if (err) {
        throw new InternalServerErrorException({
          description: "Failed to validate password",
        });
      }
      if (compare !== true) {
        throw new UnauthorizedException({ description: "Invalid Password" });
      }
      if (compare === true) {
        return user;
      }
    });
  }
}
