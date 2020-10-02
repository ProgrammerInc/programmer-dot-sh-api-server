import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypegooseModule } from 'nestjs-typegoose';
import { redisOptions } from '../config/redis.options';
import { FeedModule } from '../feed/feed.module';
import { FeedService } from '../feed/feed.service';
import { Feed } from '../feed/models/feed.model';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { Article } from './models/article.model';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NEWS_FEED_WORKER',
        transport: Transport.REDIS,
        options: redisOptions,
      },
    ]),
    TypegooseModule.forFeature([
      { typegooseClass: Article, schemaOptions: { timestamps: true } },
      { typegooseClass: Feed, schemaOptions: { timestamps: true } },
    ]),
    FeedModule,
  ],
  providers: [ArticleResolver, ArticleService, FeedService],
})
export class ArticleModule {}
