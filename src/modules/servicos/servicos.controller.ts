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
} from '@nestjs/common';

import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @Post()
  create(@Body() createServicoDto: CreateServicoDto) {
    return this.servicosService.create(createServicoDto);
  }

  @Get()
  findAll() {
    return this.servicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.servicosService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServicoDto: UpdateServicoDto,
  ) {
    return this.servicosService.update(id, updateServicoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.servicosService.remove(id);
  }
}

