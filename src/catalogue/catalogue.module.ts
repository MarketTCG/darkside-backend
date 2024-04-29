import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogueService } from './catalogue.service';
import { CatalogueController } from './catalogue.controller';
import { Catalogue } from './models/catalogue.model';
import { CatalogueSchema } from './schemas/catalogue.schema';

@Module({
 imports: [
    MongooseModule.forFeature([{ name: Catalogue.name, schema: CatalogueSchema }]),
 ],
 providers: [CatalogueService],
 controllers: [CatalogueController],
})
export class CatalogueModule {}