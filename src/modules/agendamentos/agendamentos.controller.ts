import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';

import { AgendamentosService } from './agendamentos.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Agendamentos')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('agendamentos')
export class AgendamentosController {
  constructor(
    private readonly agendamentosService: AgendamentosService,
  ) { }

  @ApiResponse({ status: 201, description: 'Agendamento criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Regra de negócio: conflito/passatado/serviço inválido' })
  @Post()
  create(@Body() dto: CreateAgendamentoDto) {
    return this.agendamentosService.create(dto);
  }

  @ApiResponse({ status: 200, description: 'Lista paginada de agendamentos ativos' })
  @Get()
  findAll(@Query() query: PaginationDto) {
    const { page, limit } = query;
    return this.agendamentosService.findAll(page, limit);
  }

  @Get("historico")
  historico(
    @Query("page") page = 1,
    @Query("limit") limit = 10,
  ) {
    return this.agendamentosService.historico(
      Number(page),
      Number(limit),
    );
  }

  @ApiResponse({ status: 200, description: 'Agendamento encontrado' })
  @ApiResponse({ status: 404, description: 'Agendamento não encontrado' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.agendamentosService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAgendamentoDto,
  ) {
    return this.agendamentosService.update(id, dto);
  }

  @ApiResponse({ status: 200, description: 'Agendamento cancelado (soft delete)' })
  @Delete(':id')
  cancelar(@Param('id', ParseIntPipe) id: number) {
    return this.agendamentosService.cancelar(id);
  }

}
