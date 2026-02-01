import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 120 })
  nome: string;

  @ApiProperty({ required: false })
  @Column({ length: 20, nullable: true })
  telefone?: string;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  observacao?: string;
}
