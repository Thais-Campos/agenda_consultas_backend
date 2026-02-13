import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, MoreThanOrEqual, Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Agendamento } from '../agendamentos/entities/agendamento.entity';
@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private repo: Repository<Cliente>,

    @InjectRepository(Agendamento)
    private agendamentoRepo: Repository<Agendamento>,
  ) { }


  create(dto: CreateClienteDto) {
    const cliente = this.repo.create(dto);
    return this.repo.save(cliente);
  }

  async findAll(page = 1, limit = 10, busca?: string) {

  const where = busca
    ? { nome: ILike(`%${busca}%`), ativo: true }
    : { ativo: true };

  const [data, total] = await this.repo.findAndCount({
    where,
    skip: (page - 1) * limit,
    take: limit,
    order: { nome: 'ASC' },
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

  async findOne(id: number) {
    const cliente = await this.repo.findOne({ where: { id } });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return cliente;
  }

  async update(id: number, dto: UpdateClienteDto) {
    const cliente = await this.findOne(id);
    Object.assign(cliente, dto);
    return this.repo.save(cliente);
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);

    const temAgendamentoFuturo = await this.agendamentoRepo.count({
      where: {
        cliente: { id },
        ativo: true,
        dataHora: MoreThanOrEqual(new Date()),
      },
    });

    if (temAgendamentoFuturo > 0) {
      throw new BadRequestException(
        'Este cliente possui agendamentos futuros. Deseja realmente desativar?'
      );
    }

    cliente.ativo = false;
    await this.repo.save(cliente);

    return { message: 'Cliente desativado com sucesso' };
  }

  async forceRemove(id: number) {
  const cliente = await this.findOne(id);

  await this.agendamentoRepo.update(
    { cliente: { id }, ativo: true },
    { ativo: false },
  );

  cliente.ativo = false;
  await this.repo.save(cliente);

  return { message: 'Cliente desativado e agendamentos cancelados' };
}


}
