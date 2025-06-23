import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  nom: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => User)
    users: User[];
}