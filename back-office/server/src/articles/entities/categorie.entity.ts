import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Articles } from './article.entity';

@Entity('categorie')
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  nom: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Articles, (article) => article.categorie)
  articles: Articles[];
}
