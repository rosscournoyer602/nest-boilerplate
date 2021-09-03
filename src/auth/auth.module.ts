import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { Auth } from "./entities/auth.entity";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), PassportModule],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
