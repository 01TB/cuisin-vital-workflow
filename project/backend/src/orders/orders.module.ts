import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandeIndividuelle } from '../entities/commande-individuelle.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CommandeIndividuelle])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}