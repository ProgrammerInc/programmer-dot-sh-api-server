import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { configOptions } from './config/config.options';
import { graphqlOptions } from './config/graphql.options';
import { staticOptions } from './config/static.options';
import { DatabaseModule } from './database/database.module';
import { FeedModule } from './feed/feed.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    DatabaseModule,
    GraphQLModule.forRoot(graphqlOptions),
    HealthModule,
    ServeStaticModule.forRoot(staticOptions),
    TerminusModule,
    FeedModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
