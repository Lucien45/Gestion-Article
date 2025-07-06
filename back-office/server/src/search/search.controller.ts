import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/auth.guard';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly serachService: SearchService) {}

  /**
   * SEARCH ARTICLES ROUTES ADMIN
   **/

  @Get('categorie')
  @UseGuards(JwtAuthGuard)
  searchCategorie(@Query('q') text: string) {
    return this.serachService.getFilterCategorie(text);
  }

  @Get('article')
  @UseGuards(JwtAuthGuard)
  searchArticle(@Query('q') text: string, @Query('m') mode: string) {
    return this.serachService.getFilterArticle(text, mode);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  searchUser(@Query('q') text: string, @Query('m') mode: string) {
    return this.serachService.getFilterUser(text, mode);
  }

  /**
   * SEARCH ARTICLES ROUTES APP
   **/

  @Get('suggestions')
  getSuggestions(@Query('q') text: string) {
    return this.serachService.getSuggestions(text);
  }

  @Get('results')
  getSearchResults(
    @Query('q') text: string,
    @Query('categorie') categorie: string,
    @Query('auteur') auteur: string,
  ) {
    return this.serachService.getSearchResults(text, categorie, auteur);
  }
}
