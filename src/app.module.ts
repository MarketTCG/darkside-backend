import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './templates/cards.module';
import { CatalogueModule } from './catalogue/catalogue.module';
import { ProductModule } from './product/product.module';
import { ListingModule } from './listing/listing.module';
import { InventoryModule } from './inventory/inventory.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_CON),
    CardsModule,
    CatalogueModule,
    ProductModule,
    ListingModule,
    InventoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
