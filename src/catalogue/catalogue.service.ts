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



async findByAspect(aspect: string): Promise<Catalogue[]> {
  console.log(`Searching for name: ${aspect}`);
  const result = await this.catalogueModel.find({ Aspects: { $regex: aspect, $options: 'i' } }).exec();
  console.log(`Found documents:`, result);
  return result;
}

async search(key: string, value: string): Promise<any> {
 
  const query = {};
  query[key] = { $regex: value, $options: 'i' }; // Case-insensitive search
  console.log(`Searching for name: ${key}`);
  console.log(`Searching for name: ${value}`);

  // Execute the query
  return this.catalogueModel.find(query).exec();
}

}
