import * as mongoose from 'mongoose';

export const FeedSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    alias: String,
    author: String,
    publisher: String,
    published: Boolean,
    image: String,
    logo: String,
    lang: String,
    url: String,
    feedType: String,
    feedUrl: String,
    guid: String,
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
      },
    ],
  },
  { timestamps: true },
);
