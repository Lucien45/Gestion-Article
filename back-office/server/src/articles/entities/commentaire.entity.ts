import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Articles } from './article.entity';
import { Users } from 'src/users/entities/user.entity';

@Entity('commentaire')
export class Commentaires {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  contenu: string;

  @ManyToOne(() => Users, (user) => user.id, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Articles, (article) => article.id, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'article_id' })
  article: Articles;

  @Column({
    type: 'enum',
    enum: ['approuve', 'en attente', 'rejete'],
    default: 'en attente',
  })
  status: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_commantaire: Date;
}
