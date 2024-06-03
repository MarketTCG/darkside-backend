import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponseMetadata, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { VendorService } from './vendor.service';
import { VendorDto } from './dto/vendor.dto';
import { Vendor } from './model/vendor.model';

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

  @Post()
  @ApiOperation({ summary: 'Create a new vendor' })
  @ApiResponse({ status: 201, description: 'The vendor has been successfully created.', type: VendorDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createVendorDto: VendorDto): Promise<Vendor> {
    return this.vendorService.create(createVendorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vendors' })
  @ApiResponse({ status: 200, description: 'Return all vendors', type: [VendorDto] })
  async findAll(): Promise<Vendor[]> {
    return this.vendorService.findAll();
  }
}