import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsPositive } from 'class-validator';

export class CreateAgendamentoDto {
  @ApiProperty({
    example: '2026-02-10T10:00:00',
    description: 'Data e hora do agendamento (ISO)',
  })
  dataHora: string;

  @ApiProperty({ example: 1, description: 'ID do cliente' })
  clienteId: number;

  @ApiProperty({ example: 1, description: 'ID do serviço' })
  servicoId: number;
}

