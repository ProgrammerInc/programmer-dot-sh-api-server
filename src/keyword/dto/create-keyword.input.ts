import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateKeywordInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  tag?: string;

  @Field({ defaultValue: true })
  published: boolean;
}
