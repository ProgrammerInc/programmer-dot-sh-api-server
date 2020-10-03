import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Category } from '../category/models/category.model';
import { LinkResolver } from './link.resolver';
import { LinkService } from './link.service';
import { Link } from './models/link.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: Category, schemaOptions: { timestamps: true } },
      { typegooseClass: Link, schemaOptions: { timestamps: true } },
    ]),
  ],
  providers: [LinkResolver, LinkService],
})
export class LinkModule {}
