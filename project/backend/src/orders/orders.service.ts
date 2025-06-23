import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommandeIndividuelle } from '../entities/commande-individuelle.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(CommandeIndividuelle)
    private orderRepository: Repository<CommandeIndividuelle>,
  ) {}

  async findAll() {
    return this.orderRepository.find({
      where: { deleted_at: null },
      relations: ['client', 'statut', 'livreur'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string) {
    return this.orderRepository.findOne({
      where: { id, deleted_at: null },
      relations: ['client', 'statut', 'livreur'],
    });
  }

  async create(orderData: Partial<CommandeIndividuelle>) {
    const order = this.orderRepository.create(orderData);
    return this.orderRepository.save(order);
  }

  async updateStatus(id: string, statutId: number) {
    await this.orderRepository.update(id, { statut_id: statutId });
    return this.findOne(id);
  }
}