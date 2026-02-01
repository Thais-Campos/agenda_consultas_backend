import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Servico } from './entities/servico.entity';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';

@Injectable()
export class ServicosService {
  constructor(
    @InjectRepository(Servico)
    private servicoRepository: Repository<Servico>,
  ) {}

  async create(createServicoDto: CreateServicoDto): Promise<Servico> {
    const servico = this.servicoRepository.create(createServicoDto);
    return this.servicoRepository.save(servico);
  }

  async findAll(): Promise<Servico[]> {
    return this.servicoRepository.find();
  }

  async findOne(id: number): Promise<Servico> {
    const servico = await this.servicoRepository.findOneBy({ id });

    if (!servico) {
      throw new NotFoundException('Serviço não encontrado');
    }

    return servico;
  }

  async update(
    id: number,
    updateServicoDto: UpdateServicoDto,
  ): Promise<Servico> {
    const servico = await this.findOne(id);

    this.servicoRepository.merge(servico, updateServicoDto);
    return this.servicoRepository.save(servico);
  }

  async remove(id: number): Promise<void> {
    const servico = await this.findOne(id);
    await this.servicoRepository.remove(servico);
  }
}
