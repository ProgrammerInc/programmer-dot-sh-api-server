import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypegooseModule } from 'nestjs-typegoose';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { Article } from './models/article.model';

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
    TypegooseModule.forFeature([{ typegooseClass: Article, schemaOptions: { timestamps: true } }]),
  ],
  providers: [ArticleResolver, ArticleService],
})
export class ArticleModule {}
