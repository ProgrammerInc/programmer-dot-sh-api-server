import { Injectable } from '@nestjs/common';
import { Ref, ReturnModelType } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { InjectModel } from 'nestjs-typegoose';
import { Category } from '../category/models/category.model';
import { Feed } from '../feed/models/feed.model';
import { Keyword } from '../keyword/models/keyword.model';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { Article } from './models/article.model';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article) private readonly articleModel: ReturnModelType<typeof Article>,
    @InjectModel(Feed) private readonly feedModel: ReturnModelType<typeof Feed>,
  ) {}

  async create(createArticleInput: CreateArticleInput): Promise<Article> {
    const article = new Article(createArticleInput);

    const newArticle = new this.articleModel(article);
    const createdArticle = await newArticle.save();

    await this.feedModel.findByIdAndUpdate(article.feed, {
      $push: {
        articles: createdArticle.id,
      },
    });

    return createdArticle;
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleModel.findById(id).exec();

    return article;
  }

  async update(id: string, updateArticleInput: UpdateArticleInput) {
    const article = new Article(updateArticleInput);

    const updatedArticle = await this.articleModel.findByIdAndUpdate(id, article, { new: true });

    return updatedArticle;
  }

  async remove(id: string): Promise<any> {
    const deletedArticle = await this.articleModel.findByIdAndRemove(id);

    return deletedArticle;
  }

  async category(id: string): Promise<Ref<Category, ObjectId>> {
    const article = await this.articleModel.findById(id).populate('category');

    return article.category;
  }

  async feed(id: string): Promise<Ref<Feed, ObjectId>> {
    const article = await this.articleModel.findById(id).populate('feed');

    return article.feed;
  }

  async keywords(id: string): Promise<Ref<Keyword, ObjectId>[]> {
    const article = await this.articleModel.findById(id).populate('keywords');

    return article.keywords;
  }
}
