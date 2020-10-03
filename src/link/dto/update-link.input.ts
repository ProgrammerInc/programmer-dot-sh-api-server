import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateLinkInput } from './create-link.input';

@InputType()
export class UpdateLinkInput extends PartialType(CreateLinkInput) {
  @Field()
  id?: string;

  @Field({ nullable: true })
  path?: string;

  @Field({ nullable: false })
  url?: string;

  @Field({ defaultValue: true })
  published: boolean;

  @Field({ nullable: true })
  category?: string;

  urlCode?: string;
}
