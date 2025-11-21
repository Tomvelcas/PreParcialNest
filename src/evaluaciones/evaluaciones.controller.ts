import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { EvaluacionesService } from './evaluaciones.service';

@Controller('evaluaciones')
export class EvaluacionesController {
  constructor(private readonly evaluacionesService: EvaluacionesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  crearEvaluacion(@Body() dto: CreateEvaluacionDto) {
    return this.evaluacionesService.crearEvaluacion(dto);
  }
}
