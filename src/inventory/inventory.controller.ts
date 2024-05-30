// src/inventory/inventory.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { InventoryDto } from './dto/inventory.dto';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all inventory items' })
  @ApiResponse({ status: 200, description: 'Successful retrieval', type: [InventoryDto] })
  async findAll(): Promise<InventoryDto[]> {
    return this.inventoryService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new inventory item' })
  @ApiResponse({ status: 201, description: 'Inventory item created successfully', type: InventoryDto })
  async create(@Body() createInventoryDto: InventoryDto): Promise<InventoryDto> {
    return this.inventoryService.create(createInventoryDto);
  }
}
