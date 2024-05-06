import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Listing } from './models/listing.model';
import { Product } from '../product/models/product.model';
import { Types } from 'mongoose';

@Injectable()
export class ListingService {
  constructor(@InjectModel('Listing') private readonly listingModel: Model<Listing>,
              @InjectModel('Product') private productModel: Model<Product>) {}

  async findAll(): Promise<Listing[]> {
    return this.listingModel.find().exec();
  }

  async findById(id: string): Promise<Listing> {
    try {
        const objectId = new Types.ObjectId(id);
        console.log("searching for", objectId)
        return this.listingModel.findById(objectId).exec();
    } catch (error) {
        // Handle the error, e.g., by throwing a custom exception
        throw new BadRequestException('Invalid ID format');
    }
}

  async appendProductToListing(listingId: string, productId: string): Promise<Listing> {
    // Find the product by its ID
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
        throw new Error('Product not found');
    }

    // Append the product to the Listing array of the specified listing
    return this.listingModel.findByIdAndUpdate(
        listingId,
        { $push: { Listing: product } },
        { new: true } // This option returns the updated document
    ).exec();
  }

}