import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateFeedInput } from './dto/create-feed.input';
import { UpdateFeedInput } from './dto/update-feed.input';
import { Feed } from './entities/feed.entity';

@Injectable()
export class FeedService {
  constructor(
    @Inject('FEED_MODEL')
    private feedModel: Model<Feed>,
  ) {}

  async create(createFeedInput: CreateFeedInput): Promise<Feed> {
    const createdFeed = new this.feedModel(createFeedInput);

    return createdFeed.save();
  }

  async findAll(): Promise<Feed[]> {
    return this.feedModel.find().exec();
  }

  async findOne(id: string): Promise<Feed> {
    const feed = await this.feedModel.findById(id).exec();

    return feed;
  }

  async update(id: string, updateFeedInput: UpdateFeedInput) {
    const updatedFeed = await this.feedModel.findByIdAndUpdate(id, updateFeedInput, { new: true });

    return updatedFeed;
  }

  async remove(id: string): Promise<any> {
    const deletedFeed = await this.feedModel.findByIdAndRemove(id);

    return deletedFeed;
  }
}
