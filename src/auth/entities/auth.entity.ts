import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Auth {
  @PrimaryColumn()
  username: string;
  @Column()
  password: string;
}
