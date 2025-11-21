import { IsInt, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateEstudianteDto {
  @IsInt()
  @IsPositive()
  cedula: number;

  @IsNotEmpty()
  nombre: string;

  @IsInt()
  @Min(1)
  semestre: number;

  @IsNotEmpty()
  programa: string;

  @IsNumber()
  promedio: number;
}
