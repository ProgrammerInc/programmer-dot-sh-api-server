import { Field, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

@ObjectType()
export class Article extends Document {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  logo?: string;

  @Field({ nullable: true })
  lang?: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  guid?: string;

  @Field({ nullable: true })
  publisher?: string;

  @Field()
  published: boolean;

  @Field({ nullable: true })
  publishedAt?: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
