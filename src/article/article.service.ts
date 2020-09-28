import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ARTICLE_MODEL')
    private articleModel: Model<Article>,
  ) {}

  async create(article: CreateArticleInput): Promise<Article> {
    const createdArticle = new this.articleModel(article);

    return createdArticle.save();
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleModel.findById(id).exec();

    return article;
  }

  async update(id: string, article: UpdateArticleInput) {
    const updatedArticle = await this.articleModel.findByIdAndUpdate(id, article, { new: true });

    return updatedArticle;
  }

  async remove(id: string): Promise<any> {
    const deletedArticle = await this.articleModel.findByIdAndRemove(id);

    return deletedArticle;
  }
}
