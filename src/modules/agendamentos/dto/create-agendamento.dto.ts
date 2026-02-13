import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsPositive } from 'class-validator';

export class CreateAgendamentoDto {

  @ApiProperty({
    example: '2026-02-10T10:00:00',
    description: 'Data e hora do agendamento (ISO)',
  })
  @IsDateString({}, { message: 'Data inválida' })
  dataHora: string;

  @ApiProperty({ example: 1, description: 'ID do cliente' })
  @IsInt({ message: 'Cliente inválido' })
  @IsPositive()
  clienteId: number;

  @ApiProperty({ example: 1, description: 'ID do serviço' })
  @IsInt({ message: 'Serviço inválido' })
  @IsPositive()
  servicoId: number;
}
