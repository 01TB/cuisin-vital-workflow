import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nom: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  prix_carte: number;

  @Column()
  temps_preparation: number;

  @Column({ default: true })
  disponible: boolean;

  @Column({ length: 255, nullable: true })
  photo_url: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}