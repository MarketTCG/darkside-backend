// src/listings/listings.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor } from '../vendor/models/vendor.model';
import { Product } from '../product/models/product.model';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class ListingsService {

  constructor(
    @InjectModel('Vendor') private readonly vendorModel: Model<Vendor>,
    @InjectModel('Product') private readonly productModel: Model<Product>
  ) {}

  async updateQuantity(updateQuantityDto: UpdateQuantityDto) {
    const { _id, Quantity } = updateQuantityDto;

    // Find the listing in vendor inventory to get the quality
    const vendorListing = await this.vendorModel.findOne(
      { 'Listings.ListingId': _id },
      { 'Listings.$': 1 }
    ).exec();

    if (!vendorListing) {
      throw new NotFoundException(`Listing with ID ${_id} not found in vendor inventory`);
    }

    const quality = vendorListing.Listings[0].Quality;

    // Update quantity in vendor inventory
    const vendorUpdateResult = await this.vendorModel.updateOne(
      { 'Listings.ListingId': _id },
      { $set: { 'Listings.$.Quantity': Quantity } }
    ).exec();

    if (vendorUpdateResult.modifiedCount === 0) {
      throw new NotFoundException(`Listing with ID ${_id} not found in vendor inventory`);
    }

    // Update quantity in product listing
    const productUpdateResult = await this.productModel.updateOne(
      { [`Listing.${quality}.ListingId`]: _id },
      { $set: { [`Listing.${quality}.$.Quantity`]: Quantity } }
    ).exec();

    if (productUpdateResult.modifiedCount === 0) {
      throw new NotFoundException(`Listing with ID ${_id} not found in product listing`);
    }

    return { message: 'Quantity updated successfully' };
  }

  async updatePrice(updatePriceDto: UpdatePriceDto) {
    const { _id, Price } = updatePriceDto;

    // Find the listing in vendor inventory to get the quality
    const vendorListing = await this.vendorModel.findOne(
      { 'Listings.ListingId': _id },
      { 'Listings.$': 1 }
    ).exec();

    if (!vendorListing) {
      throw new NotFoundException(`Listing with ID ${_id} not found in vendor inventory`);
    }

    const quality = vendorListing.Listings[0].Quality;

    // Update price in vendor inventory
    const vendorUpdateResult = await this.vendorModel.updateOne(
      { 'Listings.ListingId': _id },
      { $set: { 'Listings.$.Price': Price } }
    ).exec();

    if (vendorUpdateResult.modifiedCount === 0) {
      throw new NotFoundException(`Listing with ID ${_id} not found in vendor inventory`);
    }

    // Update price in product listing
    const productUpdateResult = await this.productModel.updateOne(
      { [`Listing.${quality}.ListingId`]: _id },
      { $set: { [`Listing.${quality}.$.Price`]: Price } }
    ).exec();

    if (productUpdateResult.modifiedCount === 0) {
      throw new NotFoundException(`Listing with ID ${_id} not found in product listing`);
    }

    return { message: 'Price updated successfully' };
  }

  async deleteListing(listingId: string) {
    // Find the listing in vendor inventory to get the quality
    const vendorListing = await this.vendorModel.findOne(
      { 'Listings.ListingId': listingId },
      { 'Listings.$': 1 }
    ).exec();

    if (!vendorListing) {
      throw new NotFoundException(`Listing with ID ${listingId} not found in vendor inventory`);
    }

    const quality = vendorListing.Listings[0].Quality;

    // Delete listing from vendor inventory
    const vendorUpdateResult = await this.vendorModel.updateOne(
      { 'Listings.ListingId': listingId },
      { $pull: { Listings: { ListingId: listingId } } }
    ).exec();

    if (vendorUpdateResult.modifiedCount === 0) {
      throw new NotFoundException(`Listing with ID ${listingId} not found in vendor inventory`);
    }

    // Delete listing from product listing
    const productUpdateResult = await this.productModel.updateOne(
      { [`Listing.${quality}.ListingId`]: listingId },
      { $pull: { [`Listing.${quality}`]: { ListingId: listingId } } }
    ).exec();

    if (productUpdateResult.modifiedCount === 0) {
      throw new NotFoundException(`Listing with ID ${listingId} not found in product listing`);
    }

    return { message: 'Listing deleted successfully' };
  }

  async findByListingId(listingId: string) {
    // Find listing in vendor inventory
    const vendorListing = await this.vendorModel.findOne(
      { 'Listings.ListingId': listingId },
      { 'Listings.$': 1 }
    ).exec();

    if (!vendorListing) {
      throw new NotFoundException(`Listing with ID ${listingId} not found in vendor inventory`);
    }

    const quality = vendorListing.Listings[0].Quality;

    // Find listing in product listing
    const productListing = await this.productModel.findOne(
      { [`Listing.${quality}.ListingId`]: listingId },
      { [`Listing.${quality}.$`]: 1 }
    ).exec();

    if (!productListing) {
      throw new NotFoundException(`Listing with ID ${listingId} not found in product listing`);
    }

    return {
      vendorListing: vendorListing.Listings[0],
      productListing: productListing.Listing[quality][0],
    };
  }
}
