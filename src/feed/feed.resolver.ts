import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFeedInput } from './dto/create-feed.input';
import { UpdateFeedInput } from './dto/update-feed.input';
import { Feed } from './entities/feed.entity';
import { FeedService } from './feed.service';

@Resolver(() => Feed)
export class FeedResolver {
  constructor(private readonly feedService: FeedService) {}

  @Mutation(() => Feed)
  createFeed(@Args('createFeedInput') createFeedInput: CreateFeedInput) {
    return this.feedService.create(createFeedInput);
  }

  @Query(() => [Feed], { name: 'feed' })
  findAll() {
    return this.feedService.findAll();
  }

  @Query(() => Feed, { name: 'feed' })
  findOne(@Args('id') id: string) {
    return this.feedService.findOne(id);
  }

  @Mutation(() => Feed)
  updateFeed(@Args('updateFeedInput') updateFeedInput: UpdateFeedInput) {
    return this.feedService.update(updateFeedInput.id, updateFeedInput);
  }

  @Mutation(() => Feed)
  removeFeed(@Args('id') id: string) {
    return this.feedService.remove(id);
  }
}
