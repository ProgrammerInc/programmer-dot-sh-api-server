import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Article } from '../article/models/article.model';
import { CreateFeedInput } from './dto/create-feed.input';
import { UpdateFeedInput } from './dto/update-feed.input';
import { FeedService } from './feed.service';
import { Feed } from './models/feed.model';

@Resolver(() => Feed)
export class FeedResolver {
  constructor(private readonly feedService: FeedService) {}

  @Mutation(() => Feed)
  createFeed(@Args('feed') feed: CreateFeedInput): Promise<Feed> {
    return this.feedService.create(feed);
  }

  @Query(() => [Feed], { name: 'feeds' })
  findAll(): Promise<Feed[]> {
    return this.feedService.findAll();
  }

  @Query(() => Feed, { name: 'feed' })
  findOne(@Args('id') id: string): Promise<Feed> {
    return this.feedService.findOne(id);
  }

  @Mutation(() => Feed)
  updateFeed(@Args('feed') feed: UpdateFeedInput): Promise<Feed> {
    return this.feedService.update(feed.id, feed);
  }

  @Mutation(() => Feed)
  removeFeed(@Args('id') id: string): Promise<any> {
    return this.feedService.remove(id);
  }

  @ResolveField()
  async articles(@Parent() feed: Feed): Promise<Article[]> {
    const { id } = feed;

    return this.feedService.articles(id);
  }
}
