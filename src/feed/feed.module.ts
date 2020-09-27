import { forwardRef, Module } from '@nestjs/common';
import { ArticleModule } from '../article/article.module';
import { articleProviders } from '../article/article.providers';
import { ArticleService } from '../article/article.service';
import { DatabaseModule } from '../database/database.module';
import { feedProviders } from './feed.providers';
import { FeedResolver } from './feed.resolver';
import { FeedService } from './feed.service';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => ArticleModule),
  ],
  providers: [ArticleService, FeedResolver, FeedService, ...articleProviders, ...feedProviders]
})
export class FeedModule {}
