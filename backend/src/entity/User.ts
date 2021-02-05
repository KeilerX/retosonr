import { Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Observation } from './Observation';

@Entity()
@Unique(['nombre_usuario'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  nombre_usuario: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @OneToMany(() => Observation, observation => observation.creado_por)
  observationsCreated: Observation[];

  @OneToMany(() => Observation, observation => observation.resuelto_por)
  observationsSolved: Observation[];

  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}