import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Cliente } from '../../clientes/entities/cliente.entity';
import { Servico } from '../../servicos/entities/servico.entity';

@Entity({ name: 'agendamentos' })
export class Agendamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  dataHora: Date;

  @Column({ default: true })
  ativo: boolean;

  @ManyToOne(() => Cliente, { eager: true })
  cliente: Cliente;

  @ManyToOne(() => Servico, { eager: true })
  servico: Servico;

  @CreateDateColumn()
  criadoEm: Date;
}
