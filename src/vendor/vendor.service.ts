import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor } from './models/vendor.model';
import { Product } from '../product/models/product.model';
import { AddInventoryDto } from './dto/add-inventory.dto'
import { Types } from 'mongoose';
import { RemoveInventoryDto } from './dto/remove-inventory.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { AddCardsDto } from './dto/add-cards.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VendorService {
  constructor(@InjectModel('Vendor') private readonly vendorModel: Model<Vendor>,
  @InjectModel('Product') private readonly productModel: Model<Product>) {}

  async createVendor(userId: string): Promise<Vendor> {

    // IMPLEMENT A FIND USER TO GET EMAIL, OR REQUIRE EMAIL AND NAME IN BODY
    const newVendor = new this.vendorModel({
      UserID: userId,
      Inventory: [],
      VendorRating: 0,
      VendorName: "test name",
      VendorEmail: "testvendoremail@gmail.com"
    });
    return newVendor.save();
  }

  async findAll(): Promise<Vendor[]> {
    return this.vendorModel.find().exec();
  }

  async findById(id: string): Promise<Vendor> {
    try {
        const objectId = new Types.ObjectId(id);
        console.log("searching for", objectId)
        return this.vendorModel.findById(objectId).exec();
    } catch (error) {
        // Handle the error, e.g., by throwing a custom exception
        throw new BadRequestException('Invalid ID format');
    }
  }

  async addInventoryItems(vendorId: string, addInventoryDto: AddInventoryDto) {
    const { items } = addInventoryDto;
    const updatedVendor = await this.vendorModel.findByIdAndUpdate(
      vendorId,
      { $push: { Inventory: items } },
      { new: true }
    );

    if (!updatedVendor) {
      throw new NotFoundException('Vendor not found');
    }

    return updatedVendor;
  }

  async getVendorInventory(vendorId: string) {
    const vendor = await this.vendorModel.findById(vendorId).exec();
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }
    return vendor.Inventory;
  }

  async getInventoryItemsByIds(vendorId: string, itemIds: string[]) {
    const vendor = await this.vendorModel.findById(vendorId).exec();
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    const inventoryItems = vendor.Inventory.filter(item => itemIds.includes(item._id.toString()));
    if (inventoryItems.length === 0) {
      throw new NotFoundException('No inventory items found with the provided IDs');
    }

    return inventoryItems;
  }

  async removeInventoryItems(vendorId: string, removeInventoryDto: RemoveInventoryDto) {
    const { itemIds } = removeInventoryDto;
    const updatedVendor = await this.vendorModel.findByIdAndUpdate(
      vendorId,
      { $pull: { Inventory: { _id: { $in: itemIds } } } },
      { new: true }
    );

    if (!updatedVendor) {
      throw new NotFoundException('Vendor not found');
    }

    return updatedVendor;
  }

  async updateInventoryItemPrice(vendorId: string, updatePriceDto: UpdatePriceDto) {
    const { _id, Price } = updatePriceDto;

    const updatedVendor = await this.vendorModel.findOneAndUpdate(
      { _id: vendorId, 'Inventory._id': _id },
      { $set: { 'Inventory.$.Price': Price } },
      { new: true }
    );

    if (!updatedVendor) {
      throw new NotFoundException('Vendor or inventory item not found');
    }

    return updatedVendor;
  }

  async updateInventoryItemQuantity(vendorId: string, updateQuantityDto: UpdateQuantityDto) {
    const { _id, Quantity } = updateQuantityDto;
    console.log(updateQuantityDto)
    const updatedVendor = await this.vendorModel.findOneAndUpdate(
      { _id: vendorId, 'Inventory._id': _id },
      { $set: { 'Inventory.$.Quantity': Quantity } },
      { new: true }
    );

    if (!updatedVendor) {
      throw new NotFoundException('Vendor or inventory item not found');
    }

    return updatedVendor;
  }

  async addCardsToProductsAndVendorListings(vendorId: string, addCardsDto: AddCardsDto) {

    try 
    { 
      const vendor = await this.vendorModel.findById(vendorId);

      if (!vendor) {
        throw new Error('Vendor not found'); }
      }
        
    catch ( error ) {
      console.error('Vendor not found in vendor database using _id', error);
      throw new Error('Failed to find vendor');
    }

    try { 
      const product = await this.productModel.findById(vendorId);

      if (!product) {
        throw new Error('Product not found'); }
      } 
      catch ( error ) {
        console.error('Product was unable to be found in product database using _id', error);
        throw new Error('Failed to find product');
    }

    const { products } = addCardsDto;

    console.log('Updating products and vendor listings with IDs and their respective cards:', products);

    try {
      // Loop through each product and update the product model and vendor listings
      for (const product of products) {
        const { productId, cards } = product;

        // Group cards by quality for product update
        const groupedCards: { [key: string]: { VendorId: string; Quantity: number; Price: number; ListingId: string }[] } = {};
        const modifyInventory = [];

        cards.forEach(card => {
          const listingId = uuidv4(); // Generate a unique identifier for each card entry

          

          if (!groupedCards[card.Quality]) {
            groupedCards[card.Quality] = [];
          }
          groupedCards[card.Quality].push({
            VendorId: vendorId,
            Quantity: card.Quantity,
            Price: card.Price,
            ListingId: listingId,
          });

          modifyInventory.push({
            IsListed: true,
            ListingId: listingId,
          });
        });

        const updateObject: { [key: string]: any } = {};
        for (const quality in groupedCards) {
          if (groupedCards.hasOwnProperty(quality)) {
            updateObject[`Listing.${quality}`] = { $each: groupedCards[quality] };
          }
        }

        // Update the product model
        await this.productModel.updateOne(
          { _id: productId },
          { $push: updateObject }
        ).exec();

        // Update the vendor document
        await this.vendorModel.updateOne(
          { _id: vendorId },
          { $set: { Listings: { $each: modifyInventory } } }
        ).exec();
      }

      return { message: 'Cards added successfully to all specified products and vendor listings' };
    } catch (error) {
      console.error('Error updating products and vendor listings:', error);
      throw new Error('Failed to update products and vendor listings');
    }
  }

}
