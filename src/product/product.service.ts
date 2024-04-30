import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './models/product.model';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product> {
    try {
        const objectId = new Types.ObjectId(id);
        console.log("searching for", objectId)
        return this.productModel.findById(objectId).exec();
    } catch (error) {
        // Handle the error, e.g., by throwing a custom exception
        throw new BadRequestException('Invalid ID format');
    }
}
}