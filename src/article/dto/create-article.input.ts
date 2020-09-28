import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateArticleInput {
  @Field()
  @IsNotEmpty()
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
  @IsNotEmpty()
  url: string;

  @Field({ nullable: true })
  guid?: string;

  @Field({ nullable: true })
  publisher?: string;

  @Field({ defaultValue: true })
  published: boolean;

  @Field({ nullable: true })
  publishedAt?: Date;

  @Field()
  feed?: string;
}
