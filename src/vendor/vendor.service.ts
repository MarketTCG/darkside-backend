import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor } from './models/vendor.model';
import { AddInventoryDto } from './dto/add-inventory.dto'
import { Types } from 'mongoose';
import { RemoveInventoryDto } from './dto/remove-inventory.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';

@Injectable()
export class VendorService {
  constructor(@InjectModel('Vendor') private readonly vendorModel: Model<Vendor>) {}

  async createVendor(userId: string) {
    const newVendor = new this.vendorModel({
      UserID: userId,
      Inventory: [],
      VendorRating: 0,
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

}
