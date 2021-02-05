import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Observation } from './Observation';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vim: string;

  @OneToMany(() => Observation, observation => observation.idvehiculo)
  vehiclesRegistered: Observation[];
}