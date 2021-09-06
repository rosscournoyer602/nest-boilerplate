import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { Auth } from "./entities/auth.entity";
import { LocalStrategy } from "./local.strategy";
import { AuthController } from "./auth.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), PassportModule],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
