import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('historique')
export class Historiques {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.id, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'varchar', nullable: true })
  action: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_action: Date;
}
