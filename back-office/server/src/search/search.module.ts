import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from 'src/articles/entities/article.entity';
import { Categories } from 'src/articles/entities/categorie.entity';
import { Commentaires } from 'src/articles/entities/commentaire.entity';
import { Historiques } from 'src/articles/entities/historique.entity';
import { Likes } from 'src/articles/entities/like.entity';
import { Users } from 'src/users/entities/user.entity';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Articles,
      Categories,
      Commentaires,
      Historiques,
      Likes,
      Users,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [SearchService],
  controllers: [SearchController],
  exports: [SearchService],
})
export class SearchModule {}
