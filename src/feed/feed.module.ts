import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ArticleModule } from '../article/article.module';
import { articleProviders } from '../article/article.providers';
import { ArticleService } from '../article/article.service';
import { DatabaseModule } from '../database/database.module';
import { feedProviders } from './feed.providers';
import { FeedResolver } from './feed.resolver';
import { FeedService } from './feed.service';

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
    forwardRef(() => ArticleModule),
  ],
  providers: [ArticleService, FeedResolver, FeedService, ...articleProviders, ...feedProviders],
})
export class FeedModule {}
