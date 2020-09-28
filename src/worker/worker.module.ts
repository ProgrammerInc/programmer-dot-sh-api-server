import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ArticleModule } from '../article/article.module';
import { articleProviders } from '../article/article.providers';
import { ArticleService } from '../article/article.service';
import { configOptions } from '../config/config.options';
import { DatabaseModule } from '../database/database.module';
import { databaseProviders } from '../database/database.providers';
import { FeedModule } from '../feed/feed.module';
import { feedProviders } from '../feed/feed.providers';
import { FeedService } from '../feed/feed.service';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

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
    ConfigModule.forRoot(configOptions),
    DatabaseModule,
    ArticleModule,
    FeedModule,
  ],
  controllers: [WorkerController],
  providers: [
    WorkerService,
    ArticleService,
    FeedService,
    ...databaseProviders,
    ...articleProviders,
    ...feedProviders,
  ],
})
export class WorkerModule {}
