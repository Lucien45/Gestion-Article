import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  ParseIntPipe,
  UploadedFiles,
  Patch,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { CreateCategorieDto, UpdateCategorieDto } from './dto/categorie.dto';
import {
  CreateCommentaireDto,
  UpdateCommenatireDto,
} from './dto/commentaire.dto';
import { CreateHistoriqueDto, UpdateHistoriqueDto } from './dto/historique.dto';
import { CreateLikeDto, UpdateLikeDto } from './dto/like.dto';
import * as multer from 'multer';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  /**
   * Upload configuration
   **/
  private static uploadConfig(folder: string) {
    return {
      storage: diskStorage({
        destination: `./media/${folder}`,
        filename: (_, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    };
  }

  /**
   * CATEGORIES ROUTES
   **/
  @Post('categories')
  createCategorie(@Body() dto: CreateCategorieDto) {
    return this.articlesService.createCategorie(dto);
  }

  @Get('categories')
  findAllCategories() {
    return this.articlesService.findAllCategorie();
  }

  @Get('categories/:id')
  findCategorieById(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findCategorieById(id);
  }

  @Put('categories/:id')
  updateCategorie(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategorieDto,
  ) {
    return this.articlesService.updateCategorie(id, dto);
  }

  @Delete('categories/:id')
  removeCategorie(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.removeCategorie(id);
  }

  /**
   * ARTICLES ROUTES
   **/
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 2, {
      storage: multer.memoryStorage(),
    }),
  )
  createArticle(
    @Body() dto: CreateArticleDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const couverture = files.find((file) => file.mimetype.includes('image'));
    const pdf = files.find((file) => file.mimetype.includes('pdf'));

    console.log('Photo recu:', couverture);
    console.log('pdf recu:', pdf);
    console.log('Données recu:', dto);
    return this.articlesService.createArticle(dto, couverture, pdf);
  }

  @Post('import')
  importArticles(@Body() articles: CreateArticleDto[]) {
    return this.articlesService.createMany(articles);
  }

  @Get()
  findAllArticles() {
    return this.articlesService.findAllArticle();
  }

  @Get('article/:id')
  findArticleById(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findArticleById(id);
  }

  @Patch('article/:id')
  @UseInterceptors(
    FilesInterceptor('files', 2, {
      storage: multer.memoryStorage(),
    }),
  )
  updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const couverture = files?.find((file) => file.mimetype.includes('image'));
    const pdf = files?.find((file) => file.mimetype.includes('pdf'));

    console.log('Photo update recu:', couverture);
    console.log('pdf update recu:', pdf);
    console.log('Données a jour recu:', dto);
    return this.articlesService.updateArticle(id, dto, couverture, pdf);
  }

  @Delete('article/:id')
  removeArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.removeArticle(id);
  }

  /**
   * COMMENTAIRES ROUTES
   **/
  @Post('commentaires')
  createCommentaire(@Body() dto: CreateCommentaireDto) {
    return this.articlesService.createCommentaire(dto);
  }

  @Get('commentaires')
  async getAllCommentaires() {
    return this.articlesService.findAllCommentaire();
  }

  @Get('commentaires/:id')
  findCommentaireById(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findCommentaireById(id);
  }

  @Put('commentaires/:id')
  updateCommentaire(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCommenatireDto,
  ) {
    return this.articlesService.updateCommentaire(id, dto);
  }

  @Delete('commentaires/:id')
  removeCommentaire(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.removeCommentaire(id);
  }

  /**
   * HISTORIQUES ROUTES
   **/
  @Post('historiques')
  createHistorique(@Body() dto: CreateHistoriqueDto) {
    return this.articlesService.createHistorique(dto);
  }

  @Get('historiques')
  findAllHistoriques() {
    return this.articlesService.findAllHistorique();
  }

  @Get('historiques/:id')
  findHistoriqueById(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findHistoriqueById(id);
  }

  @Put('historiques/:id')
  updateHistorique(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHistoriqueDto,
  ) {
    return this.articlesService.updateHistorique(id, dto);
  }

  @Delete('historiques/:id')
  removeHistorique(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.removeHistorique(id);
  }

  /**
   * LIKES ROUTES
   **/
  @Post('likes')
  createLike(@Body() dto: CreateLikeDto) {
    return this.articlesService.createLike(dto);
  }

  @Get('likes')
  findAllLikes() {
    return this.articlesService.findAllLike();
  }

  @Get('likes/:id')
  findLikeById(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findLikeById(id);
  }

  @Put('likes/:id')
  updateLike(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLikeDto,
  ) {
    return this.articlesService.updateLike(id, dto);
  }

  @Delete('likes/:id')
  removeLike(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.removeLike(id);
  }
}
