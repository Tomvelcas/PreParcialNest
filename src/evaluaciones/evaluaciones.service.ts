import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluacion } from '../entities/evaluacion.entity';
import { Profesor } from '../entities/profesor.entity';
import { Proyecto } from '../entities/proyecto.entity';

@Injectable()
export class EvaluacionesService {
  constructor(
    @InjectRepository(Evaluacion)
    private readonly evaluacionesRepo: Repository<Evaluacion>,
    @InjectRepository(Proyecto)
    private readonly proyectosRepo: Repository<Proyecto>,
    @InjectRepository(Profesor)
    private readonly profesoresRepo: Repository<Profesor>,
  ) {}

  async crearEvaluacion(payload: Partial<Evaluacion>): Promise<Evaluacion> {
    if (
      payload.calificacion === undefined ||
      payload.calificacion < 0 ||
      payload.calificacion > 5
    ) {
      throw new BadRequestException('La calificación debe estar entre 0 y 5');
    }

    if (!payload.proyecto?.id || !payload.evaluador?.id) {
      throw new BadRequestException('Se requiere proyecto y evaluador');
    }

    const proyecto = await this.proyectosRepo.findOne({
      where: { id: payload.proyecto.id },
      relations: ['mentor'],
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    const evaluador = await this.profesoresRepo.findOne({
      where: { id: payload.evaluador.id },
    });

    if (!evaluador) {
      throw new NotFoundException('Evaluador no encontrado');
    }

    if (proyecto.mentor?.id === evaluador.id) {
      throw new BadRequestException(
        'El evaluador no puede ser el mentor del proyecto',
      );
    }

    const evaluacion = this.evaluacionesRepo.create({
      calificacion: payload.calificacion,
      activa: payload.activa ?? true,
      proyecto,
      evaluador,
    });

    return this.evaluacionesRepo.save(evaluacion);
  }
}
