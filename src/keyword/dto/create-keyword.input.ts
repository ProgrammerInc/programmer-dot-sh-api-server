import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateKeywordInput {
  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsString()
  tag?: string;

  @Field({ defaultValue: true })
  @IsNotEmpty()
  @IsBoolean()
  published: boolean;
}
