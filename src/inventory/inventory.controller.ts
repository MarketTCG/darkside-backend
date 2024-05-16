import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Inventory } from './models/inventory.model'; // Adjust the import path as necessary

@Controller('inventory')
export class InventoryController {
 constructor(private readonly inventoryService: InventoryService) {}

 @Get()
 async findAll(): Promise<Inventory[]> {
    return this.inventoryService.findAll();
 }

 @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.inventoryService.handleFile(file);
  }


}
