import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Proyecto } from './proyecto.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  cedula: number;

  @Column()
  nombre: string;

  @Column({ type: 'int' })
  semestre: number;

  @Column()
  programa: string;

  @Column({ type: 'int' })
  promedio: number;

  @OneToMany(() => Proyecto, (proyecto) => proyecto.lider)
  proyectos?: Proyecto[];
}
