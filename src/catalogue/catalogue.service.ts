import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalogue } from './models/catalogue.model'; // Adjust the import path as necessary

@Injectable()
export class CatalogueService {
 constructor(@InjectModel('Catalogue') private catalogueModel: Model<Catalogue>) {}

 async findAll(): Promise<Catalogue[]> {
    return await this.catalogueModel.find().exec();
 }

 async findByName(name: string): Promise<Catalogue[]> {
  console.log(`Searching for name: ${name}`);
  const result = await this.catalogueModel.find({ Name: { $regex: name, $options: 'i' } }).exec();
  console.log(`Found documents:`, result);
  return result;
}

}
