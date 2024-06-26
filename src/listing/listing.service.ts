import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Listing } from './models/listing.model';
import { Product } from '../product/models/product.model';
import { Types } from 'mongoose';


@Injectable()
export class ListingService {
  constructor(
    @InjectModel('Listing') private readonly listingModel: Model<Listing>,
    @InjectModel('Product') private readonly productModel: Model<Product>
  ) {}

  async findAll(): Promise<Listing[]> {
    return this.listingModel.find().exec();
  }

  async findById(id: string): Promise<Listing> {
    try {
        console.log("searching for", id)
        return this.listingModel.findById(id).exec();
    } catch (error) {
        // Handle the error, e.g., by throwing a custom exception
        throw new BadRequestException('Invalid ID format');
    }
}



}