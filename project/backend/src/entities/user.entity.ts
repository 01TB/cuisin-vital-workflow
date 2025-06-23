import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Role } from './role.entity';
import { ZoneLivraison } from './zone-livraison.entity';

@Entity('utilisateurs')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nom: string;

  @Column({ length: 100 })
  prenom: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 20, nullable: true })
  telephone: string;

  @Column({ length: 255 })
  mot_de_passe: string;

  @Column()
  role_id: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ nullable: true })
  zone_livraison_id: number;

  @ManyToOne(() => ZoneLivraison)
  @JoinColumn({ name: 'zone_livraison_id' })
  zone_livraison: ZoneLivraison;

  @Column({ default: true })
  actif: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}