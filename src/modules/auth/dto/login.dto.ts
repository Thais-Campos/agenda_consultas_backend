import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'email@exemplo.com' })
  usuario!: string;

  @ApiProperty({ example: '123456' })
  senha!: string;
}
