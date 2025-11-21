import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluacion } from '../entities/evaluacion.entity';
import { Profesor } from '../entities/profesor.entity';
import { CreateProfesorDto } from './dto/create-profesor.dto';

@Injectable()
export class ProfesoresService {
  constructor(
    @InjectRepository(Profesor)
    private readonly profesoresRepo: Repository<Profesor>,
    @InjectRepository(Evaluacion)
    private readonly evaluacionesRepo: Repository<Evaluacion>,
  ) {}

  async crearProfesor(payload: CreateProfesorDto): Promise<Profesor> {
    if (!payload.extension?.toString().match(/^\d{5}$/)) {
      throw new BadRequestException(
        'La extensión debe tener exactamente 5 dígitos',
      );
    }

    const profesor = this.profesoresRepo.create({
      ...payload,
      extension: Number(payload.extension),
    });
    return this.profesoresRepo.save(profesor);
  }

  async asignarEvaluador(profesorId: number): Promise<Profesor> {
    const profesor = await this.profesoresRepo.findOne({
      where: { id: profesorId },
    });

    if (!profesor) {
      throw new NotFoundException('Profesor no encontrado');
    }

    const evaluacionesActivas = await this.evaluacionesRepo.count({
      where: { evaluador: { id: profesorId }, activa: true },
      relations: ['evaluador'],
    });

    if (evaluacionesActivas >= 3) {
      throw new BadRequestException(
        'El profesor ya tiene 3 evaluaciones activas',
      );
    }

    return profesor;
  }
}
