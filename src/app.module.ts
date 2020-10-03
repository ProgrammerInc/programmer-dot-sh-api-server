import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TerminusModule } from '@nestjs/terminus';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { configOptions } from './config/config.options';
import { graphqlOptions } from './config/graphql.options';
import { staticOptions } from './config/static.options';
import { typegooseOptions } from './config/typegoose.options';
import { FeedModule } from './feed/feed.module';
import { HealthModule } from './health/health.module';
import { KeywordModule } from './keyword/keyword.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    TypegooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://localhost/programmer-dot-sh',
      typegooseOptions,
    ),
    GraphQLModule.forRoot(graphqlOptions),
    HealthModule,
    ServeStaticModule.forRoot(staticOptions),
    TerminusModule,
    ArticleModule,
    CategoryModule,
    KeywordModule,
    FeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
