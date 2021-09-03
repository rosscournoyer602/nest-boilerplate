import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { Auth } from "./entities/auth.entity";
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async findOne(username: string) {
    return await this.authRepository.findOne({ username });
  }

  async create(user: CreateAuthDto) {
    const { username } = user;
    const existingUser = await this.authRepository.findOne({ username });
    if (user.password !== user.confirmPassword) {
      throw new BadRequestException({
        message: "Passwords do not match",
      });
    }
    if (existingUser) {
      throw new BadRequestException({
        description: "User name already in use",
      });
    }
    return new Promise((resolve) => {
      bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
          throw new InternalServerErrorException({
            description: "Error occured when hashing user password",
          });
        }
        this.authRepository.save({
          username,
          password: hash,
        });
        const token = this.generateToken(username);
        resolve({ token });
      });
    });
  }

  private generateToken(username: string) {
    const timestamp = new Date().getTime() / 1000;
    return jwt.encode(
      { sub: username, iat: timestamp },
      process.env.JWT_SECRET,
    );
  }
}
