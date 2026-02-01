import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(120)
  nome: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MaxLength(20)
  telefone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  observacao?: string;
}