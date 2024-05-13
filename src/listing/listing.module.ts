import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { ListingSchema } from './schemas/listing.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Listing', schema: ListingSchema }])],
  controllers: [ListingController],
  providers: [ListingService],
})
export class ListingModule {}