import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';

export class CreateEvaluacionDto {
  @IsInt()
  @Min(0)
  @Max(5)
  calificacion: number;

  @IsOptional()
  @IsBoolean()
  activa?: boolean;

  @IsInt()
  proyectoId: number;

  @IsInt()
  evaluadorId: number;
}
