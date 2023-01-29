import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rocket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  height: number;

  @Column()
  diameter: number;

  @Column()
  mass: number;

  @Column({ nullable: true })
  photo: string;
}