import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { Article } from './models/article.model';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => Article)
  createArticle(@Args('article') article: CreateArticleInput): Promise<Article> {
    return this.articleService.create(article);
  }

  @Query(() => [Article], { name: 'articles' })
  findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  @Query(() => Article, { name: 'article' })
  findOne(@Args('id') id: string): Promise<Article> {
    return this.articleService.findOne(id);
  }

  @Mutation(() => Article)
  updateArticle(@Args('article') article: UpdateArticleInput): Promise<Article> {
    return this.articleService.update(article.id, article);
  }

  @Mutation(() => Article)
  removeArticle(@Args('id') id: string): Promise<any> {
    return this.articleService.remove(id);
  }
}
