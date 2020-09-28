import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Feed } from '../feed/entities/feed.entity';
import { WorkerService } from './worker.service';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @EventPattern('feed_created')
  async feedCreated(data: Feed): Promise<void> {
    return this.workerService.feedCreated(data);
  }

  @EventPattern('update_feeds')
  async updateFeeds(data: Feed[]): Promise<void> {
    return this.workerService.updateFeeds(data);
  }
}
