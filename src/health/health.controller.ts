import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import mongoose from 'mongoose';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private microService: MicroserviceHealthIndicator,
    private mongooseService: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.mongooseService.pingCheck('mongodb', {
          connection: mongoose.connection,
          timeout: 1500,
        }),
      () =>
        this.microService.pingCheck('redis', {
          transport: Transport.REDIS,
          options: {
            url: process.env.REDIS_URL || 'redis://localhost:6379',
          },
        }),
    ]);
  }
}
