import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocioEntity } from './socio.entity';
import { UpdateSocioDto } from './dto/update-socio.dto';

@Injectable()
export class SocioService {
  constructor(
    @InjectRepository(SocioEntity)
    private sociosRepository: Repository<SocioEntity>,
  ) {}

  findAll(): Promise<SocioEntity[]> {
    return this.sociosRepository.find();
  }

  async findOne(id: number): Promise<SocioEntity> {
    const socio = await this.sociosRepository.findOne({ where: { id } });

    if (!socio) {
      throw new NotFoundException(`Socio with ID "${id}" not found`);
    }

    return socio;
  }

  async create(socio: SocioEntity): Promise<SocioEntity> {
    if (!socio.email.includes('@')) {
      throw new Error('Invalid email');
    }
    return this.sociosRepository.save(socio);
  }

  async update(
    id: number,
    updateSocioDto: UpdateSocioDto,
  ): Promise<SocioEntity> {
    if (!updateSocioDto.email.includes('@')) {
      throw new Error('Invalid email');
    }

    const socio = await this.sociosRepository.preload({
      id: id,
      ...updateSocioDto,
    });

    if (!socio) {
      throw new NotFoundException(`Socio with ID "${id}" not found`);
    }

    return this.sociosRepository.save(socio);
  }

  async delete(id: string): Promise<void> {
    await this.sociosRepository.delete(id);
  }
}
