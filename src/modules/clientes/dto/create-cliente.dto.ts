import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateClienteDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "Nome é obrigatório" })
  @MaxLength(120)
  nome: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "Telefone é obrigatório" })
  @MaxLength(20)
  telefone: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  observacao?: string;
}
