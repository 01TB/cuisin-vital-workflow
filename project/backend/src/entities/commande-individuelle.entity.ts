import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Client } from './client.entity';
import { User } from './user.entity';
import { StatutCommande } from './statut-commande.entity';

@Entity('commandes_individuelles')
export class CommandeIndividuelle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, unique: true })
  numero_commande: string;

  @Column()
  client_id: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  statut_id: number;

  @ManyToOne(() => StatutCommande)
  @JoinColumn({ name: 'statut_id' })
  statut: StatutCommande;

  @CreateDateColumn()
  date_commande: Date;

  @Column({ type: 'date' })
  date_livraison: Date;

  @Column({ type: 'text' })
  adresse_livraison: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  montant_total: number;

  @Column({ nullable: true })
  livreur_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'livreur_id' })
  livreur: User;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}