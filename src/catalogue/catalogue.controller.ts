import { Controller, Get } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { Catalogue } from './models/catalogue.model'; // Adjust the import path as necessary

@Controller('catalogue')
export class CatalogueController {
 constructor(private readonly catalogueService: CatalogueService) {}

 @Get()
 findAll(): Promise<Catalogue[]> {
    return this.catalogueService.findAll();
 }
}
