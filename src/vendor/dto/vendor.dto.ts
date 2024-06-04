// src/vendor/dto/vendor.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class InventoryItemDto {
  @ApiProperty({ example: 'inventoryItemId', description: 'The ID of the inventory item' })
  @IsString()
  _id: string;

  @ApiProperty({ example: 'productId', description: 'The ID of the product' })
  @IsString()
  productID: string;

  @ApiProperty({ example: 100, description: 'The price of the product' })
  @IsNumber()
  price: number;
}

export class VendorDto {
  @ApiProperty({ example: 'vendorId', description: 'The ID of the vendor' })
  @IsString()
  UserID: string;

  @ApiProperty({ type: [InventoryItemDto], description: 'The inventory of the vendor' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryItemDto)
  Inventory: InventoryItemDto[];

  @ApiProperty({ example: 5, description: 'The rating of the vendor' })
  @IsNumber()
  VendorRating: number;
}
