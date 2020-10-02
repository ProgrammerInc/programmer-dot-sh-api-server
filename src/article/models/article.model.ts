import { Field, ObjectType } from '@nestjs/graphql';
import { prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { Feed } from '../../feed/models/feed.model';
import { CreateArticleInput } from '../dto/create-article.input';
import { UpdateArticleInput } from '../dto/update-article.input';

@ObjectType()
export class Article {
  @Field()
  id: string;

  @Field()
  @prop({ required: true })
  title: string;

  @Field({ nullable: true })
  @prop()
  description?: string;

  @Field({ nullable: true })
  @prop()
  content?: string;

  @Field({ nullable: true })
  @prop()
  author?: string;

  @Field({ nullable: true })
  @prop()
  image?: string;

  @Field({ nullable: true })
  @prop()
  logo?: string;

  @Field({ nullable: true })
  @prop()
  lang?: string;

  @Field()
  @prop({ required: true })
  url: string;

  @Field({ nullable: true })
  @prop()
  guid?: string;

  @Field({ nullable: true })
  @prop()
  publisher?: string;

  @Field()
  @prop({ required: true })
  published: boolean;

  @Field({ nullable: true })
  @prop()
  publishedAt?: Date;

  @Field((_type) => Feed)
  @prop({ ref: () => Feed, index: true })
  public feed?: Ref<Feed>;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor(article: CreateArticleInput | UpdateArticleInput) {
    this.author = article.author;
    this.content = article.content;
    this.description = article.description;
    this.guid = article.guid;
    this.image = article.image;
    this.lang = article.lang;
    this.logo = article.logo;
    this.published = article.published;
    this.publishedAt = article.publishedAt;
    this.publisher = article.publisher;
    this.title = article.title;
    this.url = article.url;
    this.feed = new ObjectId(article.feed);
  }
}
