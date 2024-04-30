import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { Catalogue } from './models/catalogue.model'; // Adjust the import path as necessary

@Controller('catalogue')
export class CatalogueController {
 constructor(private readonly catalogueService: CatalogueService) {}

 @Get()
 async findAll(): Promise<Catalogue[]> {
    return this.catalogueService.findAll();
 }


 @Get('search')
 async search(@Query('key') key: string, @Query('value') value: string): Promise<any> {
    return this.catalogueService.search(key, value);
 }

}
