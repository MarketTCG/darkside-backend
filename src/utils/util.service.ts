import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Listing } from '../listing/models/listing.model';
import { Product } from '../product/models/product.model';
import { Vendor } from '../vendor/models/vendor.model';

@Injectable()
export class UtilService {
  constructor(
    @InjectModel('Listing') private readonly listingModel: Model<Listing>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Vendor') private readonly vendorModel: Model<Vendor>,
  ) {}

  async performUtilityOperation(): Promise<any> {
    // Example operation: Fetch all listings, products, and vendors
    const listings = await this.listingModel.find().exec();
    const products = await this.productModel.find().exec();
    const vendors = await this.vendorModel.find().exec();

    // Perform some utility operation
    return { listings, products, vendors };
  }
}
