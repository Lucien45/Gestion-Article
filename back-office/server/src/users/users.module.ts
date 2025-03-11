import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesModule } from 'src/articles/articles.module';
import { Articles } from 'src/articles/entities/article.entity';
import { Commentaires } from 'src/articles/entities/commentaire.entity';
import { Likes } from 'src/articles/entities/like.entity';
import { Users } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Articles, Commentaires, Likes, Users]),
    // ArticlesModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
