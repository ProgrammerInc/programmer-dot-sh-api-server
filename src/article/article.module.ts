import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { FeedModule } from '../feed/feed.module';
import { feedProviders } from '../feed/feed.providers';
import { FeedService } from '../feed/feed.service';
import { articleProviders } from './article.providers';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => FeedModule),
  ],
  providers: [ArticleResolver, ArticleService, FeedService, ...articleProviders, ...feedProviders]
})
export class ArticleModule {}
