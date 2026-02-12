import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cliente } from './entities/cliente.entity';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { PassportModule } from '@nestjs/passport';
import { Agendamento } from '../agendamentos/entities/agendamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Agendamento]),
  PassportModule,],
  
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
