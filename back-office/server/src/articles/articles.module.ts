import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './entities/categorie.entity';
import { Articles } from './entities/article.entity';
import { Commentaires } from './entities/commentaire.entity';
import { Historiques } from './entities/historique.entity';
import { Likes } from './entities/like.entity';
import { Users } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Categories,
      Articles,
      Commentaires,
      Historiques,
      Likes,
      Users,
    ]),
    UsersModule,
  ],
  providers: [ArticlesService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
