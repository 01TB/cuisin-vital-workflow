import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('zones_livraison')
export class ZoneLivraison {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nom: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'geometry', nullable: true })
  localisation: any;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}