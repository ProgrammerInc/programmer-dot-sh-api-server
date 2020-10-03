import { Field, ObjectType } from '@nestjs/graphql';
import { prop, Ref } from '@typegoose/typegoose';
import { Article } from '../../article/models/article.model';
import { CreateFeedInput } from '../dto/create-feed.input';
import { UpdateFeedInput } from '../dto/update-feed.input';

@ObjectType()
export class Feed {
  @Field()
  id: string;

  @Field({ nullable: true })
  @prop()
  title?: string;

  @Field({ nullable: true })
  @prop()
  description?: string;

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

  @Field({ nullable: true })
  @prop()
  path?: string;

  @Field()
  @prop({ required: true })
  url: string;

  @Field({ nullable: true })
  @prop()
  feedUrl?: string;

  @Field({ nullable: true })
  @prop()
  feedType?: string;

  @Field({ nullable: true })
  @prop()
  publisher?: string;

  @Field()
  @prop({ required: true })
  published: boolean;

  @Field((_type) => [Article])
  @prop({ ref: () => Article })
  public articles?: Ref<Article>[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor(feed: CreateFeedInput | UpdateFeedInput) {
    this.author = feed.author;
    this.description = feed.description;
    this.feedType = feed.feedType;
    this.feedUrl = feed.feedUrl;
    this.image = feed.image;
    this.lang = feed.lang;
    this.logo = feed.logo;
    this.path = feed.path;
    this.published = feed.published;
    this.publisher = feed.publisher;
    this.title = feed.title;
    this.url = feed.url;
  }
}
