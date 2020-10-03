import { Field, InputType } from '@nestjs/graphql';
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
  lang?: string;

  @Field({ nullable: true })
  path?: string;

  @Field()
  url?: string;

  @Field({ nullable: true })
  guid?: string;

  @Field({ nullable: true })
  publisher?: string;

  @Field({ defaultValue: true })
  published?: boolean;

  @Field({ nullable: true })
  publishedAt?: Date;

  @Field({ nullable: true })
  feed?: string;
}
