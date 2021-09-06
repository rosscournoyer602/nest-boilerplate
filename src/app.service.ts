import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  protectedHello(): string {
    return "Protected Hello World";
  }
}
