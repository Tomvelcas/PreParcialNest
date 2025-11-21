import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Estudiante } from './estudiante.entity';
import { Evaluacion } from './evaluacion.entity';
import { Profesor } from './profesor.entity';

@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  area: string;

  @Column({ type: 'int' })
  presupuesto: number;

  @Column({ type: 'int', nullable: true })
  notaFinal: number;

  @Column({ type: 'int' })
  estado: number;

  @Column()
  fechaInicio: string;

  @Column({ nullable: true })
  fechaFin: string;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.proyectos, {
    nullable: false,
  })
  @JoinColumn({ name: 'liderId' })
  lider: Estudiante;

  @ManyToOne(() => Profesor, (profesor) => profesor.mentorias, {
    nullable: false,
  })
  @JoinColumn({ name: 'mentorId' })
  mentor: Profesor;

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.proyecto)
  evaluaciones?: Evaluacion[];
}
