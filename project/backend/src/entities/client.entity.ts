import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ZoneLivraison } from './zone-livraison.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nom: string;

  @Column({ length: 100, nullable: true })
  prenom: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 20, nullable: true })
  telephone: string;

  @Column({ type: 'text' })
  adresse: string;

  @Column()
  zone_livraison_id: number;

  @ManyToOne(() => ZoneLivraison)
  @JoinColumn({ name: 'zone_livraison_id' })
  zone_livraison: ZoneLivraison;

  @Column({ length: 15 })
  type_client: 'PARTICULIER' | 'ENTREPRISE';

  @Column({ default: true })
  actif: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}