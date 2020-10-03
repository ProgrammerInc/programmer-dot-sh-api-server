import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Ref } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { Article } from '../article/models/article.model';
import { Feed } from '../feed/models/feed.model';
import { Keyword } from '../keyword/models/keyword.model';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './models/category.model';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  createCategory(@Args('category') category: CreateCategoryInput): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(@Args('category') category: UpdateCategoryInput): Promise<Category> {
    return this.categoryService.update(category.id, category);
  }

  @Mutation(() => Category)
  removeCategory(@Args('id') id: string): Promise<any> {
    return this.categoryService.remove(id);
  }

  @ResolveField()
  async articles(@Parent() category: Category): Promise<Ref<Article, ObjectId>[]> {
    const { id } = category;

    return this.categoryService.articles(id);
  }

  @ResolveField()
  async feeds(@Parent() category: Category): Promise<Ref<Feed, ObjectId>[]> {
    const { id } = category;

    return this.categoryService.feeds(id);
  }

  @ResolveField()
  async keywords(@Parent() category: Category): Promise<Ref<Keyword, ObjectId>[]> {
    const { id } = category;

    return this.categoryService.keywords(id);
  }
}
