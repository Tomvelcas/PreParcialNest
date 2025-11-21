import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from '../entities/estudiante.entity';
import { Proyecto } from '../entities/proyecto.entity';
import { EstudiantesService } from './estudiantes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Proyecto])],
  providers: [EstudiantesService],
  exports: [EstudiantesService],
})
export class EstudiantesModule {}
