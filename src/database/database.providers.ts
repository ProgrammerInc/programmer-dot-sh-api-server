import mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/programmer-dot-sh', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
  },
];