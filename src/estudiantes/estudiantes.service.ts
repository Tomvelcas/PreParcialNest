import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Estudiante } from '../entities/estudiante.entity';
import { Proyecto } from '../entities/proyecto.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudiantesRepo: Repository<Estudiante>,
    @InjectRepository(Proyecto)
    private readonly proyectosRepo: Repository<Proyecto>,
  ) {}

  async crearEstudiante(payload: CreateEstudianteDto): Promise<Estudiante> {
    if (payload.promedio <= 3.2 || payload.semestre < 4) {
      throw new BadRequestException(
        'Solo se permiten estudiantes con promedio > 3.2 y semestre >= 4',
      );
    }

    const estudiante = this.estudiantesRepo.create(payload);
    return this.estudiantesRepo.save(estudiante);
  }

  async eliminarEstudiante(id: number): Promise<void> {
    const estudiante = await this.estudiantesRepo.findOne({ where: { id } });

    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }

    const proyectosActivos = await this.proyectosRepo.count({
      where: { lider: { id }, estado: LessThan(4) },
      relations: ['lider'],
    });

    if (proyectosActivos > 0) {
      throw new BadRequestException(
        'No se puede eliminar, tiene proyectos activos',
      );
    }

    await this.estudiantesRepo.remove(estudiante);
  }
}
