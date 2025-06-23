import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { CommandeIndividuelle } from '../entities/commande-individuelle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommandeIndividuelle])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}