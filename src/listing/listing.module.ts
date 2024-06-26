import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListingController } from './listing.controller';
import { ListingsService } from './listing.service';
import ListingSchema  from './schemas/listing.schema'
import ProductSchema from 'src/product/schemas/product.schema';
import VendorSchema from 'src/vendor/schemas/vendor.schema';
import OrderSchema from 'src/order/schemas/order.schema';

@Module({
  imports: 
  [
    MongooseModule.forFeature([{ name: 'Listing', schema: ListingSchema }]),
    MongooseModule.forFeature([{ name: 'Vendor', schema: VendorSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }])
  ],
  controllers: [ListingController],
  providers: [ListingsService],
})
export class ListingModule {}