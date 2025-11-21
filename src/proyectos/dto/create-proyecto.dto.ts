import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateProyectoDto {
  @IsNotEmpty()
  @Length(16, 255)
  titulo: string;

  @IsNotEmpty()
  area: string;

  @IsInt()
  @IsPositive()
  presupuesto: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  notaFinal?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(4)
  estado?: number;

  @IsNotEmpty()
  fechaInicio: string;

  @IsOptional()
  fechaFin?: string;

  @IsInt()
  liderId: number;

  @IsInt()
  mentorId: number;
}
