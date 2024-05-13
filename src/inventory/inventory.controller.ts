import { Controller, Get, Param, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './models/inventory.model'; // Adjust the import path as necessary

@Controller('inventory')
export class InventoryController {
 constructor(private readonly inventoryService: InventoryService) {}

 @Get()
 async findAll(): Promise<Inventory[]> {
    return this.inventoryService.findAll();
 }


}
