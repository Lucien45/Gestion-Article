import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articles } from './entities/article.entity';
import { Repository } from 'typeorm';
import { Categories } from './entities/categorie.entity';
import { Commentaires } from './entities/commentaire.entity';
import { Historiques } from './entities/historique.entity';
import { Likes } from './entities/like.entity';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { CreateCategorieDto, UpdateCategorieDto } from './dto/categorie.dto';
import {
  CreateCommentaireDto,
  UpdateCommenatireDto,
} from './dto/commentaire.dto';
import { CreateHistoriqueDto, UpdateHistoriqueDto } from './dto/historique.dto';
import { CreateLikeDto, UpdateLikeDto } from './dto/like.dto';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Articles)
    private readonly articleRepository: Repository<Articles>,
    @InjectRepository(Categories)
    private readonly categorieRepository: Repository<Categories>,
    @InjectRepository(Commentaires)
    private readonly commentaireRepository: Repository<Commentaires>,
    @InjectRepository(Historiques)
    private readonly historiqueRepository: Repository<Historiques>,
    @InjectRepository(Likes) private readonly likeRepository: Repository<Likes>,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  /**
   * service categorie
   **/
  async createCategorie(categorieDto: CreateCategorieDto): Promise<Categories> {
    const categorie = this.categorieRepository.create(categorieDto);
    return await this.categorieRepository.save(categorie);
  }

  async findAllCategorie(): Promise<Categories[]> {
    return await this.categorieRepository.find({
      relations: ['articles'],
    });
  }

  async findCategorieById(categorieId: number): Promise<Categories> {
    const categorie = await this.categorieRepository.findOne({
      where: { id: categorieId },
      relations: ['articles'],
    });
    if (!categorie) throw new NotFoundException('categorie non trouvé');
    return categorie;
  }

  async updateCategorie(
    categorieId: number,
    categorieDto: UpdateCategorieDto,
  ): Promise<Categories> {
    await this.categorieRepository.update(categorieId, categorieDto);
    const updateCategorie = await this.categorieRepository.findOne({
      where: { id: categorieId },
    });

    if (!updateCategorie) {
      throw new NotFoundException(
        `Catégorie avec ID ${categorieId} introuvable`,
      );
    }

    return updateCategorie;
  }

  async removeCategorie(id: number): Promise<void> {
    const categorie = await this.findCategorieById(id);
    await this.categorieRepository.remove(categorie);
  }

  /**
   * service article
   **/
  async createArticle(
    articleDto: CreateArticleDto,
    file?: Express.Multer.File,
    pdf?: Express.Multer.File,
  ): Promise<Articles> {
    const { titre, description, status, auteur_id, categorie_id } = articleDto;

    const auteur = await this.userRepository.findOne({
      where: { id: auteur_id },
    });
    if (!auteur) {
      throw new NotFoundException(`auteur avec ID ${auteur_id} introuvable`);
    }

    const categorie = await this.categorieRepository.findOne({
      where: { id: categorie_id },
    });
    if (!categorie) {
      throw new NotFoundException(
        `Categorie avec ID ${categorie_id} introuvable`,
      );
    }
    const article = this.articleRepository.create({
      titre,
      description,
      status: status || 'publié',
      contenu: pdf ? `media/livre/${pdf.filename}` : null,
      couverture: file ? `media/couverture/${file.filename}` : null,
      auteur,
      categorie,
    });

    return await this.articleRepository.save(article);
  }

  async findAllArticle(): Promise<Articles[]> {
    return this.articleRepository.find({
      relations: ['auteur', 'categorie', 'commentaires', 'likes'],
    });
  }

  async findArticleById(articleId: number): Promise<Articles> {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
      relations: ['auteur', 'categorie', 'commentaires', 'likes'],
    });
    if (!article) throw new NotFoundException('article non trouvé');
    return article;
  }

  async updateArticle(
    articleId: number,
    articleDto: UpdateArticleDto,
    file?: Express.Multer.File,
    pdf?: Express.Multer.File,
  ): Promise<Articles> {
    const article = await this.findArticleById(articleId);

    if (file) {
      articleDto.couverture = `media/couverture/${file.filename}`;
    }

    if (pdf) {
      articleDto.contenu = `media/livre/${file?.filename}`;
    }

    Object.assign(article, articleDto);
    return this.articleRepository.save(article);
  }

  async removeArticle(id: number): Promise<void> {
    const club = await this.findArticleById(id);
    await this.articleRepository.remove(club);
  }

  /**
   * service Commenatire
   **/
  async createCommentaire(
    commentaireDto: CreateCommentaireDto,
  ): Promise<Commentaires> {
    const { user_id, article_id } = commentaireDto;

    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec ID ${user_id} introuvable`);
    }

    const article = await this.articleRepository.findOne({
      where: { id: article_id },
    });
    if (!article) {
      throw new NotFoundException(`Article avec ID ${article_id} introuvable`);
    }
    const commentaire = new Commentaires();
    Object.assign(commentaire, commentaireDto);
    commentaire.user = user;
    commentaire.article = article;
    return await this.commentaireRepository.save(commentaire);
  }

  async findAllCommentaire(): Promise<Commentaires[]> {
    console.log('Fetching all comments...');
    return await this.commentaireRepository.find({
      relations: ['user', 'article'],
    });
  }

  async findCommentaireById(commentaireId: number): Promise<Commentaires> {
    const commentaire = await this.commentaireRepository.findOne({
      where: { id: commentaireId },
      relations: ['user', 'article'],
    });
    if (!commentaire) throw new NotFoundException('commentaire non trouvé');
    return commentaire;
  }

  async updateCommentaire(
    commentaireId: number,
    commentaireDto: UpdateCommenatireDto,
  ): Promise<Commentaires> {
    await this.commentaireRepository.update(commentaireId, commentaireDto);
    const updateCommentaire = await this.commentaireRepository.findOne({
      where: { id: commentaireId },
    });

    if (!updateCommentaire) {
      throw new NotFoundException(
        `Catégorie avec ID ${commentaireId} introuvable`,
      );
    }

    return updateCommentaire;
  }

  async removeCommentaire(id: number): Promise<void> {
    const commentaire = await this.findCommentaireById(id);
    await this.commentaireRepository.remove(commentaire);
  }

  /**
   * service historique
   **/
  async createHistorique(
    historiqueDto: CreateHistoriqueDto,
  ): Promise<Historiques> {
    const { user_id } = historiqueDto;

    const user = await this.userRepository.findOne({
      where: { id: user_id },
    });
    if (!user) {
      throw new NotFoundException(`auteur avec ID ${user_id} introuvable`);
    }
    const historique = new Historiques();
    Object.assign(historique, historiqueDto);
    historique.user = user;
    return await this.historiqueRepository.save(historique);
    // const historique = this.historiqueRepository.create(historiqueDto);
    // return await this.historiqueRepository.save(historique);
  }

  async findAllHistorique(): Promise<Historiques[]> {
    return await this.historiqueRepository.find({
      relations: ['user'],
    });
  }

  async findHistoriqueById(historiqueId: number): Promise<Historiques> {
    const historique = await this.historiqueRepository.findOne({
      where: { id: historiqueId },
      relations: ['user'],
    });
    if (!historique) throw new NotFoundException('categorie non trouvé');
    return historique;
  }

  async updateHistorique(
    historiqueId: number,
    historiqueDto: UpdateHistoriqueDto,
  ): Promise<Historiques> {
    await this.historiqueRepository.update(historiqueId, historiqueDto);
    const updateHistorique = await this.historiqueRepository.findOne({
      where: { id: historiqueId },
    });

    if (!updateHistorique) {
      throw new NotFoundException(
        `Catégorie avec ID ${historiqueId} introuvable`,
      );
    }

    return updateHistorique;
  }

  async removeHistorique(id: number): Promise<void> {
    const historique = await this.findHistoriqueById(id);
    await this.historiqueRepository.remove(historique);
  }

  /**
   * service Like
   **/
  async createLike(likeDto: CreateLikeDto): Promise<Likes> {
    const { user_id, article_id } = likeDto;

    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec ID ${user_id} introuvable`);
    }

    const article = await this.articleRepository.findOne({
      where: { id: article_id },
    });
    if (!article) {
      throw new NotFoundException(`Article avec ID ${article_id} introuvable`);
    }

    const like = this.likeRepository.create({
      user,
      article,
    });

    return await this.likeRepository.save(like);
  }

  async findAllLike(): Promise<Likes[]> {
    return await this.likeRepository.find({
      relations: ['user', 'article'],
    });
  }

  async findLikeById(likeId: number): Promise<Likes> {
    const like = await this.likeRepository.findOne({
      where: { id: likeId },
      relations: ['user', 'article'],
    });
    if (!like) throw new NotFoundException('like non trouvé');
    return like;
  }

  async updateLike(likeId: number, likeDto: UpdateLikeDto): Promise<Likes> {
    const { user_id, article_id } = likeDto;

    const like = await this.likeRepository.findOne({ where: { id: likeId } });
    if (!like) {
      throw new NotFoundException(`Like avec ID ${likeId} introuvable`);
    }

    if (user_id) {
      const user = await this.userRepository.findOne({
        where: { id: user_id },
      });
      if (!user) {
        throw new NotFoundException(
          `Utilisateur avec ID ${user_id} introuvable`,
        );
      }
      like.user = user;
    }

    if (article_id) {
      const article = await this.articleRepository.findOne({
        where: { id: article_id },
      });
      if (!article) {
        throw new NotFoundException(
          `Article avec ID ${article_id} introuvable`,
        );
      }
      like.article = article;
    }

    return await this.likeRepository.save(like);
  }

  async removeLike(id: number): Promise<void> {
    const like = await this.findLikeById(id);
    await this.likeRepository.remove(like);
  }
}
