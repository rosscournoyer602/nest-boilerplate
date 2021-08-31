import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coffee } from "../../coffee/entities/coffee.entity";

@Entity()
export class Flavors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Coffee, (coffee) => coffee.flavors, {
    cascade: true,
  })
  coffee: Coffee[];
}
