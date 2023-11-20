import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubSocioService } from './club-socio.service';
import { ClubSocioController } from './club-socio.controller';
import { SocioEntity } from '../socio/socio.entity';
import { Club } from '../club/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club, SocioEntity])],
  providers: [ClubSocioService],
  controllers: [ClubSocioController],
})
export class ClubSocioModule {}
