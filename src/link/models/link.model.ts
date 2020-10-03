import { Field, ObjectType } from '@nestjs/graphql';
import { prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { Category } from '../../category/models/category.model';
import { CreateLinkInput } from '../dto/create-link.input';
import { UpdateLinkInput } from '../dto/update-link.input';

@ObjectType()
export class Link {
  @Field()
  public id: string;

  @Field()
  @prop({ unique: true })
  public path: string;

  @Field()
  @prop({ required: true })
  public url: string;

  @Field()
  @prop({ unique: true })
  public urlCode: string;

  @Field()
  @prop({ required: true })
  public published: boolean;

  @Field((_type) => Category)
  @prop({ ref: () => Category, index: true })
  public category?: Ref<Category>;

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;

  public constructor(link: CreateLinkInput | UpdateLinkInput) {
    this.path = link.path || link.urlCode;
    this.url = link.url;
    this.urlCode = link.urlCode;
    this.category = link.category ? new ObjectId(link.category) : null;
  }
}
