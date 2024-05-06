import { Controller, Get, Query, Put, Body, Param } from '@nestjs/common';
import { ListingService } from './listing.service';
import { Listing } from './models/listing.model';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Get()
  async findAll(): Promise<Listing[]> {
    return this.listingService.findAll();
  }

  @Get('_id')
  async findById(@Query('id') id: string): Promise<Listing> {
    return this.listingService.findById(id);
 }

 @Put(':listingId/append-product')
 async appendProductToListing(@Param('listingId') listingId: string, @Body('productId') productId: string): Promise<any> {
    return this.listingService.appendProductToListing(listingId, productId);
 }

}