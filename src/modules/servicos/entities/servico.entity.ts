import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'servicos' })
export class Servico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: number;

  @Column({ default: true })
  ativo: boolean;
}
