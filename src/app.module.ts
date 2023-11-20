import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocioModule } from './socio/socio.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocioEntity } from './socio/socio.entity';
import { ClubModule } from './club/club.module';
import { Club } from './club/club.entity';

@Module({
  imports: [
    SocioModule,
    ClubModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'db',
      entities: [SocioEntity, Club],
      synchronize: true,
    }),
    ClubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
