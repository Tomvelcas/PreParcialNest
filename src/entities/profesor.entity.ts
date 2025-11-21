import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Evaluacion } from './evaluacion.entity';
import { Proyecto } from './proyecto.entity';

@Entity()
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  departamento: string;

  @Column({ type: 'int' })
  extension: number;

  @Column({ type: 'boolean' })
  esParEvaluador: boolean;

  @OneToMany(() => Proyecto, (proyecto) => proyecto.mentor)
  mentorias?: Proyecto[];

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.evaluador)
  evaluaciones?: Evaluacion[];
}
