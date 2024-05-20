import { Controller, Get, Query, Put, Body, Param, Post, Delete } from '@nestjs/common';
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

 @Put(':listingId/:productId/outputListing')
async addCardsToListingAndProduct(
  @Param('listingId') listingId: string,
  @Param('productId') productId: string,
  @Body() cards: { CardId: string; Price: number }[],
) {
  return this.listingService.addCardsToListingAndProduct(listingId, productId, cards);
}

@Delete(':listingId/:productId/deleteListing')
async removeCardsToListingAndProduct(
  @Param('listingId') listingId: string,
  @Param('productId') productId: string,
  @Body() id: string,
) {
  return this.listingService.removeCardsToListingAndProduct(listingId, productId, id);
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

  @Delete(':id')
  deleteListing(
    @Param('id') id: string
  ) {
    return this.listingService.deleteListing(id);
  }

}