import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './models/order.model'; // Adjust the import path as necessary

@Controller('orders')
export class OrderController {
 constructor(private readonly orderService: OrderService) {}

 @Get()
 async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
 }

}
