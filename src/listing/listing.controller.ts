import { Controller, Get, Query, Put, Body, Param, Post, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { ListingService } from './listing.service';
import { Listing } from './models/listing.model';
import { CreateListingDto } from './dto/create-listing.dto';

@ApiTags('listing')
@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Get()
  @ApiOperation({ summary: 'Get all listings' })
  @ApiResponse({ status: 200, description: 'Successful retrieval', type: [Listing] })
  async findAll(): Promise<Listing[]> {
    return this.listingService.findAll();
  }

  @Get('_id')
  @ApiOperation({ summary: 'Get listing by ID' })
  @ApiQuery({ name: 'id', required: true, description: 'The ID of the listing' })
  @ApiResponse({ status: 200, description: 'Successful retrieval', type: Listing })
  async findById(@Query('id') id: string): Promise<Listing> {
    return this.listingService.findById(id);
  }

  @Put(':listingId/:productId/outputListing')
  @ApiOperation({ summary: 'Add cards to listing and product' })
  @ApiParam({ name: 'listingId', required: true, description: 'The ID of the listing' })
  @ApiParam({ name: 'productId', required: true, description: 'The ID of the product' })
  @ApiBody({ type: [CreateListingDto], description: 'Array of cards to add' })
  @ApiResponse({ status: 200, description: 'Cards added successfully' })
  async addCardsToListingAndProduct(
    @Param('listingId') listingId: string,
    @Param('productId') productId: string,
    @Body() cards: { CardId: string; Price: number }[],
  ) {
    return this.listingService.addCardsToListingAndProduct(listingId, productId, cards);
  }

  @Delete(':listingId/:productId/deleteListing')
  @ApiOperation({ summary: 'Remove cards from listing and product' })
  @ApiParam({ name: 'listingId', required: true, description: 'The ID of the listing' })
  @ApiParam({ name: 'productId', required: true, description: 'The ID of the product' })
  @ApiBody({ type: String, description: 'ID of the card to remove' })
  @ApiResponse({ status: 200, description: 'Cards removed successfully' })
  async removeCardsToListingAndProduct(
    @Param('listingId') listingId: string,
    @Param('productId') productId: string,
    @Body() id: string,
  ) {
    return this.listingService.removeCardsToListingAndProduct(listingId, productId, id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new listing' })
  @ApiBody({ type: CreateListingDto, description: 'Details of the new listing' })
  @ApiResponse({ status: 201, description: 'Listing created successfully', type: CreateListingDto })
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
  @ApiOperation({ summary: 'Delete a listing' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the listing' })
  @ApiResponse({ status: 200, description: 'Listing deleted successfully' })
  deleteListing(
    @Param('id') id: string
  ) {
    return this.listingService.deleteListing(id);
  }
}
