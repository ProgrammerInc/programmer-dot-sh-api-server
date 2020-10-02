import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypegooseModule } from 'nestjs-typegoose';
import { redisOptions } from '../config/redis.options';
import { FeedResolver } from './feed.resolver';
import { FeedService } from './feed.service';
import { Feed } from './models/feed.model';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NEWS_FEED_WORKER',
        transport: Transport.REDIS,
        options: redisOptions,
      },
    ]),
    TypegooseModule.forFeature([{ typegooseClass: Feed, schemaOptions: { timestamps: true } }]),
  ],
  providers: [FeedResolver, FeedService],
})
export class FeedModule {}
