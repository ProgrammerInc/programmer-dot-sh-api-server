import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateKeywordInput } from './dto/create-keyword.input';
import { UpdateKeywordInput } from './dto/update-keyword.input';
import { Keyword } from './models/keyword.model';

@Injectable()
export class KeywordService {
  constructor(
    @InjectModel(Keyword) private readonly keywordModel: ReturnModelType<typeof Keyword>,
  ) {}

  async create(createKeywordInput: CreateKeywordInput): Promise<Keyword> {
    const keyword = new this.keywordModel(createKeywordInput);
    const createdKeyword = await keyword.save();

    return createdKeyword;
  }

  async findAll(): Promise<Keyword[]> {
    return this.keywordModel.find().exec();
  }

  async findOne(id: string): Promise<Keyword> {
    const keyword = await this.keywordModel.findById(id).exec();

    return keyword;
  }

  async update(id: string, updateKeywordInput: UpdateKeywordInput): Promise<Keyword> {
    const updatedKeyword = await this.keywordModel.findByIdAndUpdate(id, updateKeywordInput, {
      new: true,
    });

    return updatedKeyword;
  }

  async remove(id: string): Promise<any> {
    const deletedKeyword = await this.keywordModel.findByIdAndRemove(id);

    return deletedKeyword;
  }
}
