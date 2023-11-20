import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocioEntity } from '../socio/socio.entity';
import { Club } from '../club/club.entity';

@Injectable()
export class ClubSocioService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
    @InjectRepository(SocioEntity)
    private socioRepository: Repository<SocioEntity>,
  ) {}

  async addMemberToClub(clubId: number, socioId: number): Promise<Club> {
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });
    const socio = await this.socioRepository.findOne({
      where: { id: socioId },
    });

    if (!club || !socio) {
      throw new NotFoundException(`Club or Socio not found`);
    }

    club.socios.push(socio);
    return this.clubRepository.save(club);
  }

  async findMembersFromClub(clubId: number): Promise<SocioEntity[]> {
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });

    if (!club) {
      throw new NotFoundException(`Club with ID ${clubId} not found`);
    }

    return club.socios;
  }

  async findMemberFromClub(
    clubId: number,
    socioId: number,
  ): Promise<SocioEntity> {
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });

    if (!club) {
      throw new NotFoundException(`Club with ID ${clubId} not found`);
    }

    const socio = club.socios.find((s) => s.id === socioId);

    if (!socio) {
      throw new NotFoundException(
        `Socio with ID ${socioId} not found in Club ${clubId}`,
      );
    }

    return socio;
  }

  async updateMembersFromClub(
    clubId: number,
    socioIds: number[],
  ): Promise<Club> {
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });

    if (!Array.isArray(socioIds)) {
      throw new Error('socioIds must be an array');
    }

    if (!club) {
      throw new NotFoundException(`Club with ID ${clubId} not found`);
    }

    const currentSocios = club.socios.map((socio) => socio.id);

    const sociosToAdd = socioIds.filter((id) => !currentSocios.includes(id));
    const sociosToRemove = currentSocios.filter((id) => !socioIds.includes(id));

    if (sociosToAdd.length > 0) {
      const newSocios = await this.socioRepository.findByIds(sociosToAdd);
      club.socios.push(...newSocios);
    }

    if (sociosToRemove.length > 0) {
      club.socios = club.socios.filter(
        (socio) => !sociosToRemove.includes(socio.id),
      );
    }

    return this.clubRepository.save(club);
  }

  async deleteMemberFromClub(clubId: number, socioId: number): Promise<Club> {
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });

    if (!club) {
      throw new NotFoundException(`Club with ID ${clubId} not found`);
    }

    club.socios = club.socios.filter((s) => s.id !== socioId);
    return this.clubRepository.save(club);
  }
}
