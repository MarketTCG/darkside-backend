import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './models/product.model';
import { AddCardsDto } from './dto/add-cards.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  
  async addCardsToProducts(vendorId: string, addCardsDto: AddCardsDto) {
    const { products } = addCardsDto;

    console.log('Updating products with IDs and their respective cards:', products);

    try {
      // Loop through each product and update the product model
      for (const product of products) {
        const { productId, cards } = product;

        // Group cards by quality
        const groupedCards: { [key: string]: { VendorId: string; Quantity: number; Price: number }[] } = {};
        cards.forEach(card => {
          if (!groupedCards[card.Quality]) {
            groupedCards[card.Quality] = [];
          }
          groupedCards[card.Quality].push({
            VendorId: vendorId,
            Quantity: card.Quantity,
            Price: card.Price,
          });
        });

        const updateObject: { [key: string]: any } = {};
        for (const quality in groupedCards) {
          if (groupedCards.hasOwnProperty(quality)) {
            updateObject[`Listing.${quality}`] = { $each: groupedCards[quality] };
          }
        }

        await this.productModel.updateOne(
          { _id: productId },
          { $push: updateObject }
        ).exec();
      }

      return { message: 'Cards added successfully to all specified products' };
    } catch (error) {
      console.error('Error updating products:', error);
      throw new Error('Failed to update products');
    }
  }
}
