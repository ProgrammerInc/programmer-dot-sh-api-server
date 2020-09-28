import { Connection } from 'mongoose';
import { ArticleSchema } from './schemas/article.schema';

export const articleProviders = [
  {
    provide: 'ARTICLE_MODEL',
    useFactory: (connection: Connection) => connection.model('Article', ArticleSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
