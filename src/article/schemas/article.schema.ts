import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  author: String,
  publisher: String,
  published: Boolean,
  publishedAt: Date,
  image: String,
  logo: String,
  lang: String,
  url: String,
  guid: String,
}, { timestamps: true });