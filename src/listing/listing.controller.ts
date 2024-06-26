import { Controller, Get, Query, Put, Body, Param, Post, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { ListingService } from './listing.service';
import { Listing } from './models/listing.model';
import { CreateListingDto } from './dto/create-listing.dto';
import { ListingDto } from "./dto/listing.dto"

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

  @Get('listingId')
  @ApiOperation({ summary: 'Get listing by listingId' })
  @ApiQuery({ name: 'id', required: true, description: 'The ID of the listing' })
  @ApiResponse({ status: 200, description: 'Successful retrieval', type: Listing })
  async findById(@Query('id') id: string): Promise<Listing> {
    return this.listingService.findById(id);
  }


}
