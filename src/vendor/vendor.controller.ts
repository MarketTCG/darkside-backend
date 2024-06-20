import { Controller, Get, Post, Body, Query, Param, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponseMetadata, ApiQuery, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { VendorService } from './vendor.service';
import { VendorDto } from './dto/vendor.dto';
import { AddInventoryDto } from './dto/add-inventory.dto'
import { CreateVendorDto } from './dto/create-vendor.dto';
import { CreateCardDto } from 'src/card/dto/create-card.dto';
import { Vendor } from './models/vendor.model';
import { RemoveInventoryDto } from './dto/remove-inventory.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';

@ApiTags('vendors')
@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get('_id')
  @ApiOperation({ summary: 'Get vendor by ID' })
  @ApiQuery({ name: 'id', required: true, description: 'The ID of the listing' })
  @ApiResponse({ status: 200, description: 'Successful retrieval', type: Vendor })
  async findById(@Query('id') id: string): Promise<Vendor> {
    return this.vendorService.findById(id);
  }

  ////////////////

  @Post(':userId')
  @ApiParam({ name: 'userId', required: true, description: 'The ID of the user' })
  @ApiResponse({ status: 201, description: "The vendor has been successfully created."})
  async createVendor(
    @Param('userId') userId: string,
  ) {
    return this.vendorService.createVendor(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vendors' })
  @ApiResponse({ status: 200, description: 'Return all vendors', type: [VendorDto] })
  async findAll(): Promise<Vendor[]> {
    return this.vendorService.findAll();
  }

  @Post(':vendorId/inventory')
  @ApiOperation({ summary: 'Add inventory items to vendor' })
  @ApiBody({ type: AddInventoryDto, description: 'Card to add' })
  @ApiResponse({ status: 201, description: 'Item pushed to vendor' })
  async addInventoryItems(
    @Param('vendorId') vendorId: string,
    @Body() addInventoryDto: AddInventoryDto
  ) {
    return this.vendorService.addInventoryItems(vendorId, addInventoryDto);
  }

  @Get(':vendorId/inventory')
  @ApiOperation({ summary: 'Get inventory items for vendor' })
  @ApiParam({ name: 'vendorId', required: true, description: 'The ID of the vendor' })
  @ApiResponse({ status: 200, description: 'Inventory items retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Vendor not found' })
  async getVendorInventory(
    @Param('vendorId') vendorId: string
  ) {
    return this.vendorService.getVendorInventory(vendorId);
  }

  @Get(':vendorId/inventory/items')
  @ApiOperation({ summary: 'Get inventory items by IDs' })
  @ApiParam({ name: 'vendorId', required: true, description: 'The ID of the vendor' })
  @ApiQuery({ name: 'itemIds', required: true, description: 'Array of inventory item IDs', type: [String] })
  @ApiResponse({ status: 200, description: 'Inventory items retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No inventory items found with the provided IDs' })
  async getInventoryItemsByIds(
    @Param('vendorId') vendorId: string,
    @Query('itemIds') itemIds: string[]
  ) {
    return this.vendorService.getInventoryItemsByIds(vendorId, itemIds);
  }

  @Delete(':vendorId/inventory')
  @ApiOperation({ summary: 'Remove inventory items from vendor' })
  @ApiBody({ type: RemoveInventoryDto, description: 'Array of inventory item IDs to remove' })
  @ApiResponse({ status: 200, description: 'Items removed from vendor' })
  @ApiResponse({ status: 404, description: 'Vendor not found' })
  async removeInventoryItems(
    @Param('vendorId') vendorId: string,
    @Body() removeInventoryDto: RemoveInventoryDto
  ) {
    return this.vendorService.removeInventoryItems(vendorId, removeInventoryDto);
  }

  @Patch(':vendorId/inventory/:itemId/price')
  @ApiOperation({ summary: 'Update inventory item price' })
  @ApiParam({ name: 'vendorId', required: true, description: 'The ID of the vendor' })
  @ApiParam({ name: 'itemId', required: true, description: 'The ID of the inventory item' })
  @ApiBody({ type: UpdatePriceDto, description: 'New price of the inventory item' })
  @ApiResponse({ status: 200, description: 'Inventory item price updated successfully' })
  @ApiResponse({ status: 404, description: 'Vendor or inventory item not found' })
  async updateInventoryItemPrice(
    @Param('vendorId') vendorId: string,
    @Param('itemId') itemId: string,
    @Body() updatePriceDto: UpdatePriceDto
  ) {
    return this.vendorService.updateInventoryItemPrice(vendorId, { ...updatePriceDto, _id: itemId });
  }

  @Patch(':vendorId/inventory/:itemId/quantity')
  @ApiOperation({ summary: 'Update inventory item quantity' })
  @ApiParam({ name: 'vendorId', required: true, description: 'The ID of the vendor' })
  @ApiParam({ name: 'itemId', required: true, description: 'The ID of the inventory item' })
  @ApiBody({ type: UpdateQuantityDto, description: 'New quantity of the inventory item' })
  @ApiResponse({ status: 200, description: 'Inventory item quantity updated successfully' })
  @ApiResponse({ status: 404, description: 'Vendor or inventory item not found' })
  async updateInventoryItemQuantity(
    @Param('vendorId') vendorId: string,
    @Param('itemId') itemId: string,
    @Body() updateQuantityDto: UpdateQuantityDto
  ) {
    return this.vendorService.updateInventoryItemQuantity(vendorId, { ...updateQuantityDto, _id: itemId });
  }

}