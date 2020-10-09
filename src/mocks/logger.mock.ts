/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
import { LoggerService } from '@nestjs/common';

export class TestLogger implements LoggerService {
  log(message: string): void {}
  error(message: string, trace: string) {}
  warn(message: string) {}
  debug(message: string) {}
  verbose(message: string) {}
}
