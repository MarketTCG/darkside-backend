import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './models/order.model'; // Adjust the import path as necessary
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
 constructor(@InjectModel('Order') private orderModel: Model<Order>) {}

 async findAll(): Promise<Order[]> {
    return await this.orderModel.find().exec();
 }

 async create(createOrderDto: CreateOrderDto): Promise<Order> {
   const order = new this.orderModel(createOrderDto);
   return order.save();
 }

}
