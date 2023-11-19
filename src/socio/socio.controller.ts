import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SocioService } from './socio.service';
import { SocioEntity } from './socio.entity';

@Controller('members')
export class SocioController {
  constructor(private readonly socioService: SocioService) {}

  @Post()
  create(@Body() socio: SocioEntity) {
    return this.socioService.create(socio);
  }

  @Get()
  findAll() {
    return this.socioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socioService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() socio: SocioEntity) {
    return this.socioService.update(+id, socio);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.socioService.delete(id);
  }
}
