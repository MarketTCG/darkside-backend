// src/vendor/dto/vendor.dto.ts
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
}

export class VendorDto {
  @ApiProperty({ example: 'UserID', description: 'The ID of the vendor' })
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
