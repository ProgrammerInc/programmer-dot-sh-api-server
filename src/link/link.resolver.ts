import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Ref } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { Category } from '../category/models/category.model';
import { CreateLinkInput } from './dto/create-link.input';
import { UpdateLinkInput } from './dto/update-link.input';
import { LinkService } from './link.service';
import { Link } from './models/link.model';

@Resolver(() => Link)
export class LinkResolver {
  constructor(private readonly linkService: LinkService) {}

  @Mutation(() => Link)
  createLink(@Args('link') link: CreateLinkInput): Promise<Link> {
    return this.linkService.create(link);
  }

  @Query(() => [Link], { name: 'links' })
  findAll(): Promise<Link[]> {
    return this.linkService.findAll();
  }

  @Query(() => Link, { name: 'link' })
  findOne(@Args('id') id: string): Promise<Link> {
    return this.linkService.findOne(id);
  }

  @Mutation(() => Link)
  updateLink(@Args('link') link: UpdateLinkInput): Promise<Link> {
    return this.linkService.update(link.id, link);
  }

  @Mutation(() => Link)
  removeLink(@Args('id') id: string): Promise<any> {
    return this.linkService.remove(id);
  }

  @ResolveField()
  async category(@Parent() link: Link): Promise<Ref<Category, ObjectId>> {
    const { id } = link;

    return this.linkService.category(id);
  }
}
