import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponseMetadata, ApiQuery, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { VendorService } from './vendor.service';
import { VendorDto } from './dto/vendor.dto';
import { AddInventoryDto } from './dto/add-inventory.dto'
import { CreateVendorDto } from './dto/create-vendor.dto';
import { CreateCardDto } from 'src/card/dto/create-card.dto';
import { Vendor } from './models/vendor.model';

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

  @Post(':id/inventory')
  @ApiOperation({ summary: 'Add inventory items to vendor' })
  @ApiBody({ type: CreateCardDto, description: 'Card to add' })
  @ApiResponse({ status: 201, description: 'Item pushed to vendor' })
  async addInventoryItems(
    @Param('id') vendorId: string,
    @Body() createCardDto: CreateCardDto
  ) {
    return this.vendorService.addInventoryItems(vendorId, createCardDto);
  }
}