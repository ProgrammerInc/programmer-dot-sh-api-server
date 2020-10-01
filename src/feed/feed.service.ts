import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateFeedInput } from './dto/create-feed.input';
import { UpdateFeedInput } from './dto/update-feed.input';
import { Feed } from './models/feed.model';

@Injectable()
export class FeedService {
  constructor(
    @Inject('NEWS_FEED_WORKER') private workerClient: ClientProxy,
    @InjectModel(Feed) private readonly feedModel: ReturnModelType<typeof Feed>,
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
}
