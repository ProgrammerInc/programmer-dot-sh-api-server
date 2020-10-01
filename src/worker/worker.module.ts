import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypegooseModule } from 'nestjs-typegoose';
import { ArticleModule } from '../article/article.module';
import { ArticleService } from '../article/article.service';
import { configOptions } from '../config/config.options';
import { FeedModule } from '../feed/feed.module';
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
    TypegooseModule.forRoot('mongodb://localhost/programmer-dot-sh', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ArticleModule,
    FeedModule,
  ],
  controllers: [WorkerController],
  providers: [WorkerService, ArticleService, FeedService],
})
export class WorkerModule {}
