import { IsDateString, IsInt, IsPositive } from 'class-validator';

export class CreateAgendamentoDto {
  @IsDateString()
  dataHora: string;

  @IsInt()
  @IsPositive()
  clienteId: number;

  @IsInt()
  @IsPositive()
  servicoId: number;
}
