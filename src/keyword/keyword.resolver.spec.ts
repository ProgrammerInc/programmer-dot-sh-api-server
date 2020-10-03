import { Test, TestingModule } from '@nestjs/testing';
import { KeywordResolver } from './keyword.resolver';
import { KeywordService } from './keyword.service';

describe('KeywordResolver', () => {
  let resolver: KeywordResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeywordResolver, KeywordService],
    }).compile();

    resolver = module.get<KeywordResolver>(KeywordResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
