import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from '../article/models/article.model';
import { Feed } from '../feed/models/feed.model';
import { Keyword } from '../keyword/models/keyword.model';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { Category } from './models/category.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Article, schemaOptions: { timestamps: true } },
      { typegooseClass: Category, schemaOptions: { timestamps: true } },
      { typegooseClass: Feed, schemaOptions: { timestamps: true } },
      { typegooseClass: Keyword },
    ]),
  ],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
