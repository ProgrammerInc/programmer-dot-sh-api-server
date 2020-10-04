import { Injectable } from '@nestjs/common';
import { Ref, ReturnModelType } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { InjectModel } from 'nestjs-typegoose';
import { Article } from '../article/models/article.model';
import { Feed } from '../feed/models/feed.model';
import { Keyword } from '../keyword/models/keyword.model';
import { Link } from '../link/models/link.model';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: ReturnModelType<typeof Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const category = new this.categoryModel(createCategoryInput);
    const createdCategory = await category.save();

    return createdCategory;
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();

    return category;
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    const category = new this.categoryModel(updateCategoryInput);
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, category, {
      new: true,
    });

    return updatedCategory;
  }

  async remove(id: string): Promise<any> {
    const deletedCategory = await this.categoryModel.findByIdAndRemove(id);

    return deletedCategory;
  }

  async articles(id: string): Promise<Ref<Article, ObjectId>[]> {
    const category = await this.categoryModel.findById(id).populate('articles');

    return category.articles;
  }

  async feeds(id: string): Promise<Ref<Feed, ObjectId>[]> {
    const category = await this.categoryModel.findById(id).populate('feeds');

    return category.feeds;
  }

  async keywords(id: string): Promise<Ref<Keyword, ObjectId>[]> {
    const category = await this.categoryModel.findById(id).populate('keywords');

    return category.keywords;
  }

  async links(id: string): Promise<Ref<Link, ObjectId>[]> {
    const category = await this.categoryModel.findById(id).populate('links');

    return category.links;
  }
}
