import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articles } from 'src/articles/entities/article.entity';
import { Categories } from 'src/articles/entities/categorie.entity';
import { Commentaires } from 'src/articles/entities/commentaire.entity';
import { Historiques } from 'src/articles/entities/historique.entity';
import { Likes } from 'src/articles/entities/like.entity';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
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
   * SEARCH ARTICLES SERVICE ADMIN
   **/

  async getFilterCategorie(nom: string): Promise<any[]> {
    const query = await this.categorieRepository
      .createQueryBuilder('categorie')
      .where('categorie.nom ~* :regex', { regex: nom })
      .getMany();
    const categories = query.map((c) => ({
      type: 'categorie',
      label: c.nom,
      id: c.id,
    }));
    return categories;
  }

  async getFilterArticle(text: string, mode: string): Promise<any[]> {
    let query: Articles[] = [];
    if (mode === 'titre') {
      query = await this.articleRepository
        .createQueryBuilder('article')
        .where('article.titre ~* :regex', { regex: text })
        .getMany();
    } else if (mode === 'categorie') {
      query = await this.articleRepository
        .createQueryBuilder('article')
        .leftJoinAndSelect('article.categorie', 'categorie')
        .where('categorie.nom ~* :regex', { regex: text })
        .getMany();
    } else if (mode === 'status') {
      query = await this.articleRepository
        .createQueryBuilder('article')
        .where('CAST(article.status AS TEXT) ~* :regex', { regex: text })
        .getMany();
    } else {
      throw new NotFoundException('article non supporté');
    }
    const articles = query.map((c) => ({
      type: 'article',
      label: c.titre,
      id: c.id,
    }));
    return articles;
  }

  async getFilterUser(text: string, mode: string): Promise<any[]> {
    let query: Users[] = [];
    if (mode === 'nom') {
      query = await this.userRepository
        .createQueryBuilder('user')
        .where('user.nom ~* :regex', { regex: text })
        .getMany();
    } else if (mode === 'email') {
      query = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email ~* :regex', { regex: text })
        .getMany();
    } else if (mode === 'username') {
      query = await this.userRepository
        .createQueryBuilder('user')
        .where('user.username ~* :regex', { regex: text })
        .getMany();
    } else {
      throw new NotFoundException('utilisateur non supporté');
    }
    const users = query.map((c) => ({
      type: mode,
      label:
        mode === 'nom'
          ? c.nom
          : mode === 'email'
            ? c.email
            : mode === 'username'
              ? c.username
              : '',
      id: c.id,
    }));
    return users;
  }

  /**
   * SEARCH ARTICLES SERVICE APP
   **/
  async getSuggestions(text: string): Promise<any[]> {
    const categories = await this.categorieRepository
      .createQueryBuilder('categorie')
      .where('categorie.nom ~* :regex', { regex: text })
      .getMany();
    const articles = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.titre ~* :regex', { regex: text })
      .andWhere('article.status = :status', { status: 'publié' })
      .getMany();
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.nom ~* :regex', { regex: text })
      .andWhere('user.role IN (:...roles)', { roles: ['editeur', 'auteur'] })
      .getMany();
    const suggestions = [
      ...categories.map((c) => ({ type: 'categorie', label: c.nom })),
      ...articles.map((a) => ({ type: 'article', label: a.titre })),
      ...users.map((u) => ({ type: 'user', label: u.nom })),
    ];
    return suggestions;
  }

  async getSearchResults(
    text: string,
    categorie: string,
    auteur: string,
  ): Promise<any[]> {
    const articles = await this.categorieRepository.find({
      relations: ['articles'],
    });

    let filtered = articles;

    if (text) {
      filtered = filtered.filter((c) =>
        c.articles.some(
          (a) =>
            a.status === 'publié' &&
            (a.titre.toLowerCase().includes(text.toLowerCase()) ||
              a.description.toLowerCase().includes(text.toLowerCase()) ||
              a.categorie.nom.toLowerCase().includes(text.toLowerCase()) ||
              (a.auteur &&
                ['editeur', 'auteur'].includes(a.auteur.role) &&
                (a.auteur.nom.toLowerCase().includes(text.toLowerCase()) ||
                  a.auteur.username
                    .toLowerCase()
                    .includes(text.toLowerCase())))),
        ),
      );
    }
    if (categorie) {
      filtered = filtered.filter((c) =>
        c.articles.some(
          (a) =>
            a.status === 'publié' &&
            a.categorie.nom.toLowerCase().includes(categorie.toLowerCase()),
        ),
      );
    }
    if (auteur) {
      filtered = filtered.filter((c) =>
        c.articles.some(
          (a) =>
            a.status === 'publié' &&
            a.auteur &&
            ['editeur', 'auteur'].includes(a.auteur.role) &&
            a.auteur.nom.toLowerCase().includes(auteur.toLowerCase()),
        ),
      );
    }
    return filtered;
  }
}
