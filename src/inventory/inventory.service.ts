import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from './models/inventory.model'; // Adjust the import path as necessary

@Injectable()
export class InventoryService {
 constructor(@InjectModel('Inventory') private inventoryModel: Model<Inventory>) {}

 async findAll(): Promise<Inventory[]> {
    return await this.inventoryModel.find().exec();
 }



}
