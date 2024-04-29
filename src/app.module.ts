import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { CatalogueModule } from './catalogue/catalogue.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_CON),
    CardsModule,
    CatalogueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
