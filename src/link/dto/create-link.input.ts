import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLinkInput {
  @Field()
  path?: string;

  @Field({ nullable: false })
  url: string;

  @Field({ defaultValue: true })
  published: boolean;

  @Field({ nullable: true })
  category?: string;

  urlCode?: string;
}
