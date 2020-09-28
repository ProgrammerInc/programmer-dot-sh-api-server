import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from '../database/database.module';
import { FeedModule } from '../feed/feed.module';
import { feedProviders } from '../feed/feed.providers';
import { FeedService } from '../feed/feed.service';
import { articleProviders } from './article.providers';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NEWS_FEED_WORKER',
        transport: Transport.REDIS,
        options: {
          url: process.env.REDIS_URL || 'redis://localhost:6379',
        },
      },
    ]),
    DatabaseModule,
    forwardRef(() => FeedModule),
  ],
  providers: [ArticleResolver, ArticleService, FeedService, ...articleProviders, ...feedProviders],
})
export class ArticleModule {}
