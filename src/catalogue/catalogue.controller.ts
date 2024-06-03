import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { Catalogue } from './models/catalogue.model'; // Adjust the import path as necessary
import { CatalogueDto } from './dto/catalogue.dto'; // Adjust the import path as necessary
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('catalogue')
@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @Get()
  @ApiOperation({ summary: 'Get all catalogue items' })
  @ApiResponse({ status: 200, description: 'Successful retrieval', type: [CatalogueDto] })
  async findAll(): Promise<Catalogue[]> {
    return this.catalogueService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search catalogue items' })
  @ApiQuery({ name: 'key', required: true, description: 'The key to search by' })
  @ApiQuery({ name: 'value', required: true, description: 'The value to search for' })
  @ApiResponse({ status: 200, description: 'Successful search', type: [CatalogueDto] })
  async search(@Query('key') key: string, @Query('value') value: string): Promise<Catalogue[]> {
    return this.catalogueService.search(key, value);
  }

  @Get('frontart')
  @ApiOperation({ summary: 'Get Picture By Number' })
  @ApiQuery({ name: 'number', required: true, description: 'The Number of the Card' })
  @ApiResponse({ status: 200, description: 'Successful retrieval', type: Catalogue })
  async findByNumber(@Query('number') number: string): Promise<Catalogue> {
    return this.catalogueService.findImageByNumber(number);
  }
}