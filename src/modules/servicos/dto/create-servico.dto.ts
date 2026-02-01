import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateServicoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsPositive()
  preco: number;
}
