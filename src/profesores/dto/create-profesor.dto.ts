import { IsBoolean, IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateProfesorDto {
  @IsInt()
  cedula: number;

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  departamento: string;

  @IsInt()
  @Min(0)
  @Max(99999)
  extension: number;

  @IsBoolean()
  esParEvaluador: boolean;
}
