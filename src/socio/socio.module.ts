import { Module } from '@nestjs/common';
import { SocioController } from './socio.controller';
import { SocioService } from './socio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocioEntity } from './socio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocioEntity])],
  controllers: [SocioController],
  providers: [SocioService],
})
export class SocioModule {}
