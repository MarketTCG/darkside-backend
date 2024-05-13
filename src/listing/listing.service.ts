import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Listing } from './models/listing.model';
import { Types } from 'mongoose';


@Injectable()
export class ListingService {
  constructor(@InjectModel('Listing') private readonly listingModel: Model<Listing>) {}

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

async addCardsToListing(
  listingId: string, 
  cards: { CardId: string; Price: number }[]
) {

  console.log('Updating listing with ID:', listingId);
  console.log('Cards to add:', cards);
  try {
    return await this.listingModel.updateOne(
      { _id: listingId },
      { $push: { Listed: { $each: cards } } }
    ).exec();
  } catch (error) {
    console.error('Error updating listing:', error);
    throw new Error('Failed to update listing');
  }
}

async createListing(
  VendorId: string,
  Listed: { CardId: string; Price: number }[],
  Total: number,
  Sold: { CardId: string; CustomerId: string; Price: number }[]
) {
  const newListing = new this.listingModel({
    VendorId,
    Listed,
    Total,
    Sold
  });
  return newListing.save();
}

}