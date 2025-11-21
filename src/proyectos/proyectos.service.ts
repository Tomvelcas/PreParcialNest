import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Estudiante } from '../entities/estudiante.entity';
import { Profesor } from '../entities/profesor.entity';
import { Proyecto } from '../entities/proyecto.entity';
import { CreateProyectoDto } from './dto/create-proyecto.dto';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectosRepo: Repository<Proyecto>,
    @InjectRepository(Estudiante)
    private readonly estudiantesRepo: Repository<Estudiante>,
    @InjectRepository(Profesor)
    private readonly profesoresRepo: Repository<Profesor>,
  ) {}

  async crearProyecto(payload: CreateProyectoDto): Promise<Proyecto> {
    if (!payload.presupuesto || payload.presupuesto <= 0) {
      throw new BadRequestException('El presupuesto debe ser mayor a 0');
    }

    if (!payload.titulo || payload.titulo.length <= 15) {
      throw new BadRequestException(
        'El título debe tener más de 15 caracteres',
      );
    }

    const lider = await this.estudiantesRepo.findOne({
      where: { id: payload.liderId },
    });
    const mentor = await this.profesoresRepo.findOne({
      where: { id: payload.mentorId },
    });

    if (!lider) {
      throw new NotFoundException('Líder no encontrado');
    }

    if (!mentor) {
      throw new NotFoundException('Mentor no encontrado');
    }

    const data: DeepPartial<Proyecto> = {
      titulo: payload.titulo,
      area: payload.area,
      presupuesto: payload.presupuesto,
      notaFinal: payload.notaFinal ?? undefined,
      estado: payload.estado ?? 0,
      fechaInicio: payload.fechaInicio,
      fechaFin: payload.fechaFin ?? undefined,
      lider,
      mentor,
    };

    const proyecto = this.proyectosRepo.create(data);

    return this.proyectosRepo.save(proyecto);
  }

  async avanzarProyecto(id: number): Promise<Proyecto> {
    const proyecto = await this.proyectosRepo.findOne({ where: { id } });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    if (proyecto.estado >= 4) {
      throw new BadRequestException('El proyecto ya está en su máximo estado');
    }

    proyecto.estado += 1;
    return this.proyectosRepo.save(proyecto);
  }

  async findAllEstudiantes(proyectoId: number): Promise<Estudiante[]> {
    const proyecto = await this.proyectosRepo.findOne({
      where: { id: proyectoId },
      relations: ['lider'],
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    return proyecto.lider ? [proyecto.lider] : [];
  }
}
