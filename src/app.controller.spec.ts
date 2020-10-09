import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestLogger } from './mocks/logger.mock';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    app.useLogger(new TestLogger());
  });

  describe('root', () => {
    it('should return "Hello Programmer!"', () => {
      expect(appController.getHello()).toBe('Hello Programmer!');
    });
  });
});
