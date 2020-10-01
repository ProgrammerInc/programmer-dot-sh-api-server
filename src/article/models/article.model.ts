import { Field, ObjectType } from '@nestjs/graphql';
import { prop, Ref } from '@typegoose/typegoose';
import { Feed } from '../../feed/models/feed.model';

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
  @prop({ ref: () => Feed })
  public feed?: Ref<Feed>;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
