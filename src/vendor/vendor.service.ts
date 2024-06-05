import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor } from './models/vendor.model';
import { VendorDto } from './dto/vendor.dto';
import { AddInventoryDto } from './dto/add-inventory.dto'
import { CreateVendorDto } from './dto/create-vendor.dto';
import { CreateCardDto } from 'src/card/dto/create-card.dto';
import { Types } from 'mongoose';

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

async addInventoryItems(vendorId: string, createCardDto: CreateCardDto) {
  const updatedVendor = await this.vendorModel.findByIdAndUpdate(
    vendorId,
    { $push: { Inventory: createCardDto } },
    { new: true }
  );

  if (!updatedVendor) {
    throw new NotFoundException('Vendor not found');
  }

  return updatedVendor;
}
}
