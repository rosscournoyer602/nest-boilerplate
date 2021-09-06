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
    return new Promise(async (resolve, reject) => {
      const existingUser = await this.authRepository.findOne({ username });
      if (user.password !== user.confirmPassword) {
        reject(
          new BadRequestException({
            description: "Passwords do not match",
          }),
        );
      }
      if (existingUser) {
        reject(
          new BadRequestException({
            description: "User name already in use",
          }),
        );
      }
      bcrypt.hash(user.password, 10, async (err, hash) => {
        if (err) {
          reject(
            new InternalServerErrorException({
              description: "Error occured when hashing user password",
            }),
          );
        } else {
          const user = await this.authRepository.save({
            username,
            password: hash,
          });
          const token = this.generateToken(username);
          resolve({ user: user.username, token });
        }
      });
    });
  }

  generateToken(username: string) {
    const timestamp = new Date().getTime() / 1000;
    const exp = Math.round(Date.now() / 1000 + 5 * 60 * 60);
    return jwt.encode(
      { sub: username, iat: timestamp, exp },
      process.env.JWT_SECRET,
    );
  }
}
