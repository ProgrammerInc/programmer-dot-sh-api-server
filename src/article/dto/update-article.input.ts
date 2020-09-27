import { Field, InputType, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleInput } from './create-article.input';

@InputType()
export class UpdateArticleInput extends PartialType(CreateArticleInput) {
  @Field()
  id?: string;

  @Field()
  title?: string;

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
  language?: string;

  @Field()
  link?: string;

  @Field({ nullable: true })
  guid?: string;

  @Field({ nullable: true })
  publisher?: string;

  @Field({ defaultValue: true })
  published?: boolean;

  @Field({ nullable: true })
  publishedAt?: Date;

  @Field((_type) => Int)
  feedId?: number;
}