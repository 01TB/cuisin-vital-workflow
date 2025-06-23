import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async findAll() {
    return this.clientRepository.find({
      where: { deleted_at: null },
      relations: ['zone_livraison'],
    });
  }

  async findOne(id: string) {
    return this.clientRepository.findOne({
      where: { id, deleted_at: null },
      relations: ['zone_livraison'],
    });
  }

  async create(clientData: Partial<Client>) {
    const client = this.clientRepository.create(clientData);
    return this.clientRepository.save(client);
  }

  async update(id: string, clientData: Partial<Client>) {
    await this.clientRepository.update(id, clientData);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.clientRepository.update(id, { deleted_at: new Date() });
    return { message: 'Client supprimé avec succès' };
  }
}