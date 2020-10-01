import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypegooseModule } from 'nestjs-typegoose';
import { FeedResolver } from './feed.resolver';
import { FeedService } from './feed.service';
import { Feed } from './models/feed.model';

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
    TypegooseModule.forFeature([{ typegooseClass: Feed, schemaOptions: { timestamps: true } }]),
  ],
  providers: [FeedResolver, FeedService],
})
export class FeedModule {}
