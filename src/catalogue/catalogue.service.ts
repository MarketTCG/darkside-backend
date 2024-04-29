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
}
