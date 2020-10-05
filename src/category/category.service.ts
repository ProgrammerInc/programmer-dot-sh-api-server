import { Injectable, Logger } from '@nestjs/common';
import { Ref, ReturnModelType } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { InjectModel } from 'nestjs-typegoose';
import { Article } from '../article/models/article.model';
import { Category } from '../Category/models/Category.model';
import { Feed } from '../feed/models/feed.model';
import { Keyword } from '../keyword/models/keyword.model';
import { Link } from '../link/models/link.model';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    @InjectModel(Category) private readonly categoryModel: ReturnModelType<typeof Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    this.logger.verbose(`Creating Category with Input: ${JSON.stringify(createCategoryInput)}`);

    const category = new this.categoryModel(createCategoryInput);
    const createdCategory = await category.save();

    return createdCategory;
  }

  async findAll(): Promise<Category[]> {
    this.logger.verbose(`Finding All Categorys with Input: ${JSON.stringify({})}`);

    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    this.logger.verbose(`Finding Category by ID: ${id}`);

    const category = await this.categoryModel.findById(id).exec();

    return category;
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    this.logger.verbose(`Updating Category with Input: ${JSON.stringify(updateCategoryInput)}`);

    const category = new this.categoryModel(updateCategoryInput);
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, category, {
      new: true,
    });

    return updatedCategory;
  }

  async remove(id: string): Promise<any> {
    this.logger.verbose(`Deleting Category by ID: ${id}`);

    const deletedCategory = await this.categoryModel.findByIdAndRemove(id);

    return deletedCategory;
  }

  async articles(id: string): Promise<Ref<Article, ObjectId>[]> {
    this.logger.verbose(`Populating Articles for Category by ID: ${id}`);

    const category = await this.categoryModel.findById(id).populate('articles');

    return category.articles;
  }

  async feeds(id: string): Promise<Ref<Feed, ObjectId>[]> {
    this.logger.verbose(`Populating Feeds for Category by ID: ${id}`);

    const category = await this.categoryModel.findById(id).populate('feeds');

    return category.feeds;
  }

  async keywords(id: string): Promise<Ref<Keyword, ObjectId>[]> {
    this.logger.verbose(`Populating Keywords for Category by ID: ${id}`);

    const category = await this.categoryModel.findById(id).populate('keywords');

    return category.keywords;
  }

  async links(id: string): Promise<Ref<Link, ObjectId>[]> {
    this.logger.verbose(`Populating Links for Category by ID: ${id}`);

    const category = await this.categoryModel.findById(id).populate('links');

    return category.links;
  }
}
