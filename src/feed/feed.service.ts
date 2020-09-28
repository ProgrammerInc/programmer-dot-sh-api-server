import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { Article } from '../article/entities/article.entity';
import { CreateFeedInput } from './dto/create-feed.input';
import { UpdateFeedInput } from './dto/update-feed.input';
import { Feed } from './entities/feed.entity';

@Injectable()
export class FeedService {
  constructor(
    @Inject('NEWS_FEED_WORKER') private workerClient: ClientProxy,
    @Inject('FEED_MODEL')
    private feedModel: Model<Feed>,
  ) {}

  async create(feed: CreateFeedInput): Promise<Feed> {
    const createdFeed = new this.feedModel(feed);

    this.workerClient.emit<number>('feed_created', createdFeed);

    return createdFeed.save();
  }

  async findAll(): Promise<Feed[]> {
    return this.feedModel.find().exec();
  }

  async findOne(id: string): Promise<Feed> {
    const feed = await this.feedModel.findById(id).exec();

    return feed;
  }

  async update(id: string, feed: UpdateFeedInput) {
    const updatedFeed = await this.feedModel.findByIdAndUpdate(id, feed, {
      new: true,
    });

    return updatedFeed;
  }

  async remove(id: string): Promise<any> {
    const deletedFeed = await this.feedModel.findByIdAndRemove(id);

    return deletedFeed;
  }

  async articles(id: string): Promise<Article[]> {
    const feed = await this.feedModel.findById(id).populate('articles');

    console.log(feed);

    return feed.articles;
  }
}
