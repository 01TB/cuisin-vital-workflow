import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find({
      where: { deleted_at: null },
      relations: ['role', 'zone_livraison'],
    });
  }

  async findOne(id: string) {
    return this.userRepository.findOne({
      where: { id, deleted_at: null },
      relations: ['role', 'zone_livraison'],
    });
  }
}