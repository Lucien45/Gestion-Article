import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from 'src/articles/entities/article.entity';
import { Commentaires } from 'src/articles/entities/commentaire.entity';
import { Likes } from 'src/articles/entities/like.entity';
import { Users } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Articles, Commentaires, Likes, Users]),
    // ArticlesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    SupabaseModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
