import { Controller, Get, Query, Put, Body, Param, Post } from '@nestjs/common';
import { ListingService } from './listing.service';
import { Listing } from './models/listing.model';
import { CreateListingDto } from './dto/create-listing.dto';

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

 @Put(':id/cards')
async addCardsToListing(
  @Param('id') listingId: string,
  @Body() cards: { CardId: string; Price: number }[],
) {
  return this.listingService.addCardsToListing(listingId, cards);
}

@Post()
  createListing(
    @Body() createListingDto: CreateListingDto
  ) {
    return this.listingService.createListing(
      createListingDto.VendorId,
      createListingDto.Listed,
      createListingDto.Total,
      createListingDto.Sold
    );
  }

}