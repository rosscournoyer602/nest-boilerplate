import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
export class CreateAuthDto {
  @IsString()
  @ApiProperty({ name: "username", type: "string" })
  readonly username: string;
  @IsString()
  @ApiProperty({ name: "password", type: "string" })
  readonly password: string;
  @IsString()
  @ApiProperty({ name: "confirmpassword", type: "string" })
  readonly confirmPassword: string;
}
