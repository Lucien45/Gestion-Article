import {
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './categorie.entity';
import { Users } from 'src/users/entities/user.entity';

@Entity('article')
export class Articles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  titre: string;

  // Contenu de l'article en fichier pdf
  @Column({ type: 'varchar', nullable: true })
  contenu: string | null;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  // Photo de couverture article
  @Column({ type: 'varchar', nullable: true })
  couverture?: string | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_publication: Date;

  @ManyToOne(() => Users, (user) => user.id, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'auteur_id' })
  auteur: Users;

  @ManyToOne(() => Categories, (categorie) => categorie.id, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'categorie_id' })
  categorie: Categories;

  @Column({
    type: 'enum',
    enum: ['brouillon', 'publié', 'archivé'],
    default: 'brouillon',
  })
  status: string;

  @Column({ type: 'int', default: 0 })
  vue: number;
}
