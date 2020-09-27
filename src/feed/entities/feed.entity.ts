import { Field, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

@ObjectType()
export class Feed extends Document {
  @Field()
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  alias?: string;

  @Field({ nullable: true })
  description?: string;

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
  feedUrl?: string;

  @Field({ nullable: true })
  feedType?: string;

  @Field({ nullable: true })
  publisher?: string;

  @Field()
  published: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
