// src/listings/listings.controller.ts
import { Controller, Patch, Delete, Get, Body, Param, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ListingsService } from './listing.service';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { PurchaseItemDto } from './dto/purchase-item.dto';

@ApiTags('listings')
@Controller('listings')
export class ListingController {
  constructor(private readonly listingsService: ListingsService) {}

  @Patch('update-quantity')
  @ApiOperation({ summary: 'Update quantity of a listing' })
  @ApiBody({ type: UpdateQuantityDto, description: 'Listing ID and new quantity' })
  @ApiResponse({ status: 200, description: 'Quantity updated successfully' })
  async updateQuantity(@Body() updateQuantityDto: UpdateQuantityDto) {
    return this.listingsService.updateQuantity(updateQuantityDto);
  }

  @Patch('update-price')
  @ApiOperation({ summary: 'Update price of a listing' })
  @ApiBody({ type: UpdatePriceDto, description: 'Listing ID and new price' })
  @ApiResponse({ status: 200, description: 'Price updated successfully' })
  async updatePrice(@Body() updatePriceDto: UpdatePriceDto) {
    return this.listingsService.updatePrice(updatePriceDto);
  }

  @Delete(':listingId')
  @ApiOperation({ summary: 'Delete a listing' })
  @ApiParam({ name: 'listingId', required: true, description: 'The ID of the listing' })
  @ApiResponse({ status: 200, description: 'Listing deleted successfully' })
  async deleteListing(@Param('listingId') listingId: string) {
    return this.listingsService.deleteListing(listingId);
  }

  @Get(':listingId')
  @ApiOperation({ summary: 'Find a listing by ListingID' })
  @ApiParam({ name: 'listingId', required: true, description: 'The ID of the listing' })
  @ApiResponse({ status: 200, description: 'Listing found successfully' })
  @ApiResponse({ status: 404, description: 'Listing not found' })
  async findByListingId(@Param('listingId') listingId: string) {
    return this.listingsService.findByListingId(listingId);
  }

  @Post('purchase')
  @ApiOperation({ summary: 'Purchase an item and create an order' })
  @ApiBody({ type: PurchaseItemDto, description: 'Listing ID of the item to purchase, user ID, amount, and currency' })
  @ApiResponse({ status: 200, description: 'Item purchased and order created successfully' })
  async updateListingsUponPurchase(@Body() purchaseItemDto: PurchaseItemDto) {
    return this.listingsService.updateListingsUponPurchase(purchaseItemDto);
  }
}
