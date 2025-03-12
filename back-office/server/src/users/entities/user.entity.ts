import { Articles } from 'src/articles/entities/article.entity';
import { Commentaires } from 'src/articles/entities/commentaire.entity';
import { Likes } from 'src/articles/entities/like.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true, unique: true })
  email?: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  profile?: string | null;

  @Column({
    type: 'enum',
    enum: ['admin', 'editeur', 'auteur'],
    default: 'auteur',
  })
  role: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_creation: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date | null;

  @OneToMany(() => Articles, (article) => article.auteur)
  articles: Articles[];

  @OneToMany(() => Commentaires, (commentaire) => commentaire.user)
  commentaires: Commentaires[];

  @OneToMany(() => Likes, (like) => like.user)
  likes: Likes[];
}
