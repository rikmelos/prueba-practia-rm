import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  NotFoundException,
  Body,
} from '@nestjs/common';
import { ClubSocioService } from './club-socio.service';
import { Club } from '../club/club.entity';
import { SocioEntity } from '../socio/socio.entity';

@Controller('clubs/:clubId/members')
export class ClubSocioController {
  constructor(private readonly clubSocioService: ClubSocioService) {}

  @Post(':socioId')
  async addMemberToClub(
    @Param('clubId') clubId: string,
    @Param('socioId') socioId: string,
  ): Promise<Club> {
    return this.clubSocioService.addMemberToClub(+clubId, +socioId);
  }

  @Get()
  async findMembersFromClub(
    @Param('clubId') clubId: string,
  ): Promise<SocioEntity[]> {
    return this.clubSocioService.findMembersFromClub(+clubId);
  }

  @Get(':socioId')
  async findMemberFromClub(
    @Param('clubId') clubId: string,
    @Param('socioId') socioId: string,
  ): Promise<SocioEntity> {
    return this.clubSocioService.findMemberFromClub(+clubId, +socioId);
  }

  @Put()
  async updateMembersFromClub(
    @Param('clubId') clubId: string,
    @Body('socioIds') socioIds: number[],
  ): Promise<Club> {
    return this.clubSocioService.updateMembersFromClub(+clubId, socioIds);
  }

  @Delete(':socioId')
  async deleteMemberFromClub(
    @Param('clubId') clubId: string,
    @Param('socioId') socioId: string,
  ): Promise<Club> {
    return this.clubSocioService.deleteMemberFromClub(+clubId, +socioId);
  }
}
