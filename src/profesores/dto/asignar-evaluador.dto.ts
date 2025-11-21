import { IsInt } from 'class-validator';

export class AsignarEvaluadorDto {
  @IsInt()
  profesorId: number;
}
