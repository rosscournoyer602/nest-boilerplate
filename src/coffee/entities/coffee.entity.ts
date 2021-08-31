import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Flavors } from "../../flavors/entities/flavor.entity";

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  brand: string;

  @JoinTable() //owner side of the relationship
  @ManyToMany((type) => Flavors, (flavors) => flavors.coffee)
  flavors: Flavors[];

  @Column({ default: 0 })
  recommendations: number;
}
