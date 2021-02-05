import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, JoinColumn, ManyToOne, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from './User';
import { Vehicle } from './Vehicle';
import { Status } from './Status';

@Entity()
export class Observation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detalle: string;

  @ManyToOne(() => User, user => user.observationsCreated)
  creado_por: User;

  @ManyToOne(() => User, user => user.observationsSolved, { nullable: true })
  actualizada_por: User;

  @ManyToOne(() => Vehicle, vehicle => vehicle.vehiclesRegistered)
  idvehiculo: Vehicle;

  @ManyToOne(() => Status, status => status.observationsStatus)
  idestado: Status;


  resuelto_por: User;
}