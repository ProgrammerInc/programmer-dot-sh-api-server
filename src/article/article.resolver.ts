import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Ref } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { Category } from '../category/models/category.model';
import { Feed } from '../feed/models/feed.model';
import { Keyword } from '../keyword/models/keyword.model';
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

  @ResolveField()
  async category(@Parent() article: Article): Promise<Ref<Category, ObjectId>> {
    const { id } = article;

    return this.articleService.category(id);
  }

  @ResolveField()
  async feed(@Parent() article: Article): Promise<Ref<Feed, ObjectId>> {
    const { id } = article;

    return this.articleService.feed(id);
  }

  @ResolveField()
  async keywords(@Parent() article: Article): Promise<Ref<Keyword, ObjectId>[]> {
    const { id } = article;

    return this.articleService.keywords(id);
  }
}
