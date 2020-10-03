import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryInput } from './create-category.input';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field()
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  path?: string;

  @Field({ defaultValue: true })
  published: boolean;
}
