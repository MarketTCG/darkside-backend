import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogueModule } from './catalogue/catalogue.module';
import { ProductModule } from './product/product.module';
import { ListingModule } from './listing/listing.module';
import { InventoryModule } from './inventory/inventory.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { HostnameModule } from './hostname/hostname.module';
import { AuthModule } from './auth/auth.module';
import { VendorModule } from './vendor/vendor.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_CON),
    CatalogueModule,
    ProductModule,
    ListingModule,
    InventoryModule,
    OrderModule,
    UserModule,
    HostnameModule,
    AuthModule,
    VendorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
