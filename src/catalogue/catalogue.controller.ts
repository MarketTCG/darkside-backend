import { Controller, Get, Param } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { Catalogue } from './models/catalogue.model'; // Adjust the import path as necessary

@Controller('catalogue')
export class CatalogueController {
 constructor(private readonly catalogueService: CatalogueService) {}

 @Get()
 async findAll(): Promise<Catalogue[]> {
    return this.catalogueService.findAll();
 }

 @Get('search/name/:name')
 async findByName(@Param('name') name: string): Promise<Catalogue[]> {
    return this.catalogueService.findByName(name);
 }

}
