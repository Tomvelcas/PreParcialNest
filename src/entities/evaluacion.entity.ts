import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profesor } from './profesor.entity';
import { Proyecto } from './proyecto.entity';

@Entity()
export class Evaluacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  calificacion: number;

  @Column({ type: 'boolean' })
  activa: boolean;

  @ManyToOne(() => Proyecto, (proyecto) => proyecto.evaluaciones, {
    nullable: false,
  })
  @JoinColumn({ name: 'proyectoId' })
  proyecto: Proyecto;

  @ManyToOne(() => Profesor, (profesor) => profesor.evaluaciones, {
    nullable: false,
  })
  @JoinColumn({ name: 'evaluadorId' })
  evaluador: Profesor;
}
