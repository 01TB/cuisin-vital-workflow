import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('statuts_commande')
export class StatutCommande {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  nom: string;

  @Column()
  ordre: number;
}