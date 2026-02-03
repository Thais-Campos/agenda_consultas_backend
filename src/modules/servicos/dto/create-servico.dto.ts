import { ApiProperty } from '@nestjs/swagger';

export class CreateServicoDto {
  @ApiProperty({ example: 'Consulta', description: 'Nome do serviço' })
  nome: string;

  @ApiProperty({ example: 120.0, description: 'Preço do serviço' })
  preco: number;
}

