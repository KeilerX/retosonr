import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Observation } from "./Observation";

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Observation, observation => observation.idestado)
  observationsStatus: Observation[];
}