import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgendamentosService } from './agendamentos.service';
import { AgendamentosController } from './agendamentos.controller';
import { Agendamento } from './entities/agendamento.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Servico } from '../servicos/entities/servico.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agendamento, Cliente, Servico]),
  ],
  controllers: [AgendamentosController],
  providers: [AgendamentosService],
})
export class AgendamentosModule {}
