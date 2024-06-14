// src/vendor/dto/add-inventory.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class InventoryItemDto {
    @ApiProperty({ example: '665d2c498805000ce934043d', description: 'The ID of the inventory item' })
    @IsString()
    VendorID: string;
  
    @ApiProperty({ example: '663104c3cb4bab0dae0be268', description: 'The ID of the product' })
    @IsString()
    ProductID: string;
  
    @ApiProperty({ example: 100, description: 'The price of the product' })
    @IsNumber()
    Price: number;

    @ApiProperty({ example: 100, description: 'The quantity of the product' })
    @IsNumber()
    Quantity: number;
}

export class AddInventoryDto {
  @ApiProperty({ type: [InventoryItemDto], description: 'Array of inventory items to add' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryItemDto)
  items: InventoryItemDto[];
}
