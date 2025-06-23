import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from '../entities/menu.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async findAll() {
    return this.menuRepository.find({
      where: { deleted_at: null },
    });
  }

  async findAvailable() {
    return this.menuRepository.find({
      where: { deleted_at: null, disponible: true },
    });
  }

  async findOne(id: number) {
    return this.menuRepository.findOne({
      where: { id, deleted_at: null },
    });
  }

  async create(menuData: Partial<Menu>) {
    const menu = this.menuRepository.create(menuData);
    return this.menuRepository.save(menu);
  }

  async update(id: number, menuData: Partial<Menu>) {
    await this.menuRepository.update(id, menuData);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.menuRepository.update(id, { deleted_at: new Date() });
    return { message: 'Menu supprimé avec succès' };
  }
}