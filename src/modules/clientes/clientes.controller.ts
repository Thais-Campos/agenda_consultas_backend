import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';


import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { PaginationDto } from '../../shared/dto/pagination.dto';

@ApiTags('Clientes')
@Controller('clientes')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)

export class ClientesController {
  constructor(private readonly service: ClientesService) { }

  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso' })
  @Post()
  create(@Body() dto: CreateClienteDto) {
    return this.service.create(dto);
  }

  @ApiResponse({ status: 200, description: 'Lista paginada de clientes' })
  @Get()
  findAll(@Query() query: PaginationDto) {
    const { page, limit } = query;
    return this.service.findAll(page, limit);
  }

  @ApiResponse({ status: 200, description: 'Cliente encontrado' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClienteDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }


}
