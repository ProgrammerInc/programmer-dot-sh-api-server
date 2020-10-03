import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateKeywordInput } from './dto/create-keyword.input';
import { UpdateKeywordInput } from './dto/update-keyword.input';
import { KeywordService } from './keyword.service';
import { Keyword } from './models/keyword.model';

@Resolver(() => Keyword)
export class KeywordResolver {
  constructor(private readonly keywordService: KeywordService) {}

  @Mutation(() => Keyword)
  createKeyword(@Args('keyword') keyword: CreateKeywordInput): Promise<Keyword> {
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
  updateKeyword(@Args('keyword') keyword: UpdateKeywordInput): Promise<Keyword> {
    return this.keywordService.update(keyword.id, keyword);
  }

  @Mutation(() => Keyword)
  removeKeyword(@Args('id') id: string): Promise<any> {
    return this.keywordService.remove(id);
  }
}