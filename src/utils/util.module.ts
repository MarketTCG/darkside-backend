import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import  ListingSchema  from '../listing/schemas/listing.schema';
import  ProductSchema  from '../product/schemas/product.schema';
import { VendorSchema } from '../vendor/schemas/vendor.schema';
import { UtilService } from './util.service';
import { UtilController } from './util.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Listing', schema: ListingSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Vendor', schema: VendorSchema }]),
  ],
  controllers: [UtilController],
  providers: [UtilService],
})
export class UtilModule {}
