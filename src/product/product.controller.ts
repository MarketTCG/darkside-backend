import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './models/product.model';
import { ProductDto } from './dto/product.dto';

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

  /*
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully', type: ProductDto })
  async create(@Body() createProductDto: ProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }
  */
}
