import { Field, ObjectType } from '@nestjs/graphql';
import { prop, Ref } from '@typegoose/typegoose';
import { Article } from '../../article/models/article.model';

@ObjectType()
export class Feed {
  @Field()
  id: string;

  @Field({ nullable: true })
  @prop()
  title?: string;

  @Field({ nullable: true })
  @prop()
  alias?: string;

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

  @Field((_type) => Article)
  @prop({ ref: () => Article })
  public articles?: Ref<Article>[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
