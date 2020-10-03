import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateKeywordInput } from './create-keyword.input';

@InputType()
export class UpdateKeywordInput extends PartialType(CreateKeywordInput) {
  @Field()
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  tag?: string;
}
