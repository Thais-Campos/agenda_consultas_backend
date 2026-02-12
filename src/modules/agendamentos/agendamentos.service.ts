import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';

import { Agendamento } from './entities/agendamento.entity';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Servico } from '../servicos/entities/servico.entity';

@Injectable()
export class AgendamentosService {
  constructor(
    @InjectRepository(Agendamento)
    private agendamentoRepository: Repository<Agendamento>,

    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,

    @InjectRepository(Servico)
    private servicoRepository: Repository<Servico>,
  ) { }

  async create(dto: CreateAgendamentoDto): Promise<Agendamento> {
    const dataHora = new Date(dto.dataHora);

    // não permitir data no passado
    if (dataHora <= new Date()) {
      throw new BadRequestException(
        'Não é permitido agendar para o passado',
      );
    }

    const cliente = await this.clienteRepository.findOneBy({
      id: dto.clienteId,
    });
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const servico = await this.servicoRepository.findOneBy({
      id: dto.servicoId,
    });
    if (!servico || !servico.ativo) {
      throw new BadRequestException('Serviço inválido ou inativo');
    }

    // ❌ evitar conflito de horário
    const conflito = await this.agendamentoRepository.findOne({
      where: { dataHora, ativo: true },
    });

    if (conflito) {
      throw new ConflictException(
        'Já existe um agendamento para este horário',
      );
    }

    const agendamento = this.agendamentoRepository.create({
      dataHora,
      cliente,
      servico,
    });

    return this.agendamentoRepository.save(agendamento);
  }

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.agendamentoRepository.findAndCount({
      where: { ativo: true },
      skip: (page - 1) * limit,
      take: limit,
      order: { dataHora: 'ASC' },
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }


  async findOne(id: number): Promise<Agendamento> {
    const agendamento = await this.agendamentoRepository.findOneBy({ id });

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    return agendamento;
  }

  async update(
    id: number,
    dto: UpdateAgendamentoDto,
  ): Promise<Agendamento> {
    const agendamento = await this.findOne(id);

    if (dto.dataHora) {
      const novaData = new Date(dto.dataHora);
      if (novaData <= new Date()) {
        throw new BadRequestException(
          'Não é permitido agendar para o passado',
        );
      }
      agendamento.dataHora = novaData;
    }

    return this.agendamentoRepository.save(agendamento);
  }

  async cancelar(id: number): Promise<void> {
    const agendamento = await this.findOne(id);
    agendamento.ativo = false;
    await this.agendamentoRepository.save(agendamento);
  }

  async historico(page = 1, limit = 10) {
    const [data, total] = await this.agendamentoRepository.findAndCount({
      where: {
        ativo: true,
        dataHora: LessThan(new Date()),
      },
      relations: ["cliente", "servico"],
      order: { dataHora: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

}
