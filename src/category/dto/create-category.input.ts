import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  id?: string;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  path?: string;

  @Field({ defaultValue: true })
  published: boolean;
}
