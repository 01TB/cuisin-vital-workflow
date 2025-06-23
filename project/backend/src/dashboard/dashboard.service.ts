import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommandeIndividuelle } from '../entities/commande-individuelle.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(CommandeIndividuelle)
    private commandeRepository: Repository<CommandeIndividuelle>,
  ) {}

  async getDashboardStats() {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Commandes en cours
    const commandesEnCours = await this.commandeRepository
      .createQueryBuilder('c')
      .innerJoin('c.statut', 's')
      .where('s.nom IN (:...statuts)', { statuts: ['RECUE', 'EN_PREPARATION', 'PRETE'] })
      .andWhere('c.deleted_at IS NULL')
      .getCount();

    // Revenus du jour
    const revenusJour = await this.commandeRepository
      .createQueryBuilder('c')
      .select('COALESCE(SUM(c.montant_total), 0)', 'total')
      .where('DATE(c.created_at) = CURRENT_DATE')
      .andWhere('c.deleted_at IS NULL')
      .getRawOne();

    // Revenus du mois
    const revenusMois = await this.commandeRepository
      .createQueryBuilder('c')
      .select('COALESCE(SUM(c.montant_total), 0)', 'total')
      .where('c.created_at >= :startOfMonth', { startOfMonth })
      .andWhere('c.deleted_at IS NULL')
      .getRawOne();

    return {
      commandesEnCours: parseInt(commandesEnCours.toString()),
      revenusJour: parseFloat(revenusJour.total),
      revenusMois: parseFloat(revenusMois.total),
    };
  }

  async getRecentOrders() {
    return this.commandeRepository.find({
      relations: ['client', 'statut'],
      where: { deleted_at: null },
      order: { created_at: 'DESC' },
      take: 10,
    });
  }
}