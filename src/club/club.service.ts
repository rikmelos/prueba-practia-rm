import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './club.entity';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ) {}

  create(createClubDto: CreateClubDto): Promise<Club> {
    const club = new Club();
    club.name = createClubDto.name;
    club.foundationDate = new Date(createClubDto.foundationDate);
    club.image = createClubDto.image;
    club.description = createClubDto.description;
    return this.clubRepository.save(club);
  }

  findAll(): Promise<Club[]> {
    return this.clubRepository.find();
  }

  async findOne(id: number): Promise<Club> {
    const club = await this.clubRepository.findOne({ where: { id } });
    if (!club) {
      throw new NotFoundException(`Club with ID "${id}" not found`);
    }
    return club;
  }

  async update(id: number, updateClubDto: UpdateClubDto): Promise<Club> {
    const club = await this.clubRepository.findOne({ where: { id } });
    if (!club) {
      throw new NotFoundException(`Club with ID "${id}" not found`);
    }

    Object.assign(club, updateClubDto);
    return this.clubRepository.save(club);
  }

  async delete(id: number): Promise<void> {
    const result = await this.clubRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Club with ID "${id}" not found`);
    }
  }
}
