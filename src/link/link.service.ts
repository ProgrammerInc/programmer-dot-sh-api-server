import { Injectable } from '@nestjs/common';
import { Ref, ReturnModelType } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { nanoid } from 'nanoid';
import { InjectModel } from 'nestjs-typegoose';
import { Category } from '../category/models/category.model';
import { CreateLinkInput } from './dto/create-link.input';
import { UpdateLinkInput } from './dto/update-link.input';
import { Link } from './models/link.model';

@Injectable()
export class LinkService {
  constructor(@InjectModel(Link) private readonly linkModel: ReturnModelType<typeof Link>) {}

  async create(createLinkInput: CreateLinkInput): Promise<Link> {
    const link = new this.linkModel({ ...createLinkInput, urlCode: nanoid(10) });
    const createdLink = await link.save();

    return createdLink;
  }

  async findAll(): Promise<Link[]> {
    return this.linkModel.find().exec();
  }

  async findOne(id: string): Promise<Link> {
    const link = await this.linkModel.findById(id).exec();

    return link;
  }

  async update(id: string, updateLinkInput: UpdateLinkInput): Promise<Link> {
    const link = new this.linkModel(updateLinkInput);
    const updatedLink = await this.linkModel.findByIdAndUpdate(id, link, {
      new: true,
    });

    return updatedLink;
  }

  async remove(id: string): Promise<any> {
    const deletedLink = await this.linkModel.findByIdAndRemove(id);

    return deletedLink;
  }

  async category(id: string): Promise<Ref<Category, ObjectId>> {
    const link = await this.linkModel.findById(id).populate('category');

    return link.category;
  }
}
