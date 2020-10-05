import { Logger, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateKeywordInput } from './dto/create-keyword.input';
import { UpdateKeywordInput } from './dto/update-keyword.input';
import { KeywordService } from './keyword.service';
import { Keyword } from './models/keyword.model';

@Resolver(() => Keyword)
export class KeywordResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  private readonly logger = new Logger(KeywordResolver.name);

  constructor(private readonly keywordService: KeywordService) {}

  @Mutation(() => Keyword)
  createKeyword(
    @Args('keyword', new ValidationPipe()) keyword: CreateKeywordInput,
  ): Promise<Keyword> {
    return this.keywordService.create(keyword);
  }

  @Query(() => [Keyword], { name: 'keywords' })
  findAll(): Promise<Keyword[]> {
    return this.keywordService.findAll();
  }

  @Query(() => Keyword, { name: 'keyword' })
  findOne(@Args('id') id: string): Promise<Keyword> {
    return this.keywordService.findOne(id);
  }

  @Mutation(() => Keyword)
  updateKeyword(
    @Args('keyword', new ValidationPipe()) keyword: UpdateKeywordInput,
  ): Promise<Keyword> {
    return this.keywordService.update(keyword.id, keyword);
  }

  @Mutation(() => Keyword)
  removeKeyword(@Args('id') id: string): Promise<any> {
    return this.keywordService.remove(id);
  }
}
