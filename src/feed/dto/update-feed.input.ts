import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { FeedType } from '../enums/feed-type.enum';
import { CreateFeedInput } from './create-feed.input';

@InputType()
export class UpdateFeedInput extends PartialType(CreateFeedInput) {
  @Field()
  id?: string;

  @Field()
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

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  feedUrl?: string;

  @Field((_type) => FeedType, { defaultValue: FeedType.NONE })
  feedType: FeedType;

  @Field({ nullable: true })
  publisher?: string;

  @Field({ defaultValue: true })
  published: boolean;
}
