import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from '../entities/estudiante.entity';
import { Profesor } from '../entities/profesor.entity';
import { Proyecto } from '../entities/proyecto.entity';
import { ProyectosService } from './proyectos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Estudiante, Profesor])],
  providers: [ProyectosService],
  exports: [ProyectosService],
})
export class ProyectosModule {}
