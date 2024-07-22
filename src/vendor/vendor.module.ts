import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorSchema } from './schemas/vendor.schema';
import  ProductSchema  from '../product/schemas/product.schema';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vendor', schema: VendorSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])
],
  controllers: [VendorController],
  providers: [VendorService],
  exports: [VendorService]
})
export class VendorModule {}