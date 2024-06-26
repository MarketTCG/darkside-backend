import { Controller, Get, Query, Post, Body, Put, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './models/product.model';
import { ProductDto } from './dto/product.dto';
import { AddCardsDto } from './dto/add-cards.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Successful retrieval', type: [ProductDto] })
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('_id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiQuery({ name: 'id', required: true, description: 'The ID of the product' })
  @ApiResponse({ status: 200, description: 'Successful retrieval', type: ProductDto })
  async findById(@Query('id') id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Put(':vendorId/add-cards')
  @ApiOperation({ summary: 'Add cards to multiple products' })
  @ApiParam({ name: 'vendorId', required: true, description: 'The ID of the vendor' })
  @ApiBody({ type: AddCardsDto, description: 'Product IDs with their respective cards to add' })
  @ApiResponse({ status: 200, description: 'Cards added successfully' })
  async addCardsToProducts(
    @Param('vendorId') vendorId: string,
    @Body() addCardsDto: AddCardsDto,
  ) {
    return this.productService.addCardsToProducts(vendorId, addCardsDto);
  }
}
