import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TerminusModule } from '@nestjs/terminus';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { configOptions } from './config/config.options';
import { graphqlOptions } from './config/graphql.options';
import { staticOptions } from './config/static.options';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    TypegooseModule.forRoot('mongodb://localhost/programmer-dot-sh', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot(graphqlOptions),
    HealthModule,
    ServeStaticModule.forRoot(staticOptions),
    TerminusModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
