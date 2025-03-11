import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Articles } from './article.entity';
import { Users } from 'src/users/entities/user.entity';

@Entity('likes')
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.id, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Articles, (article) => article.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'article_id' })
  article: Articles;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_like: Date;
}
