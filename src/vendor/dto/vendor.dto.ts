// src/vendor/dto/vendor.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

//CHECK TO SEE IF I EVEN NEED THIS

class InventoryItemDto {

  @ApiProperty({ example: '666fccac8a495eba3b996d8f', description: 'The ID of the inventory item' })
  @IsString()
  _id: string;
  
  @ApiProperty({ example: '665d2c498805000ce934043d', description: 'The ID of the inventory item' })
  @IsString()
  VendorID: string;

  @ApiProperty({ example: '663104c3cb4bab0dae0be268', description: 'The ID of the product' })
  @IsString()
  ProductID: string;

  @ApiProperty({ example: "Card Name", description: 'The name of the card' })
  @IsNumber()
  Name: string;

  @ApiProperty({ example: 100, description: 'The price of the product' })
  @IsNumber()
  Price: number;

  @ApiProperty({ example: 5, description: 'The quantity of the product' })
  @IsNumber()
  Quantity: number;

  @ApiProperty({ example: "NM", description: 'The quality of the product' })
  @IsNumber()
  Quality: string;

  @ApiProperty({ example: "true", description: 'is the item listed' })
  @IsBoolean()
  IsListed: boolean;

  @ApiProperty({ example: "id of the listing", description: 'The quality of the product' })
  @IsNumber()
  ListingId: string;
  
}

export class VendorDto {
  @ApiProperty({ example: 'UserID', description: 'The ID of the vendor' })
  @IsString()
  UserID: string;

  @ApiProperty({ example: 'VendorName', description: 'Name of the Vendor' })
  @IsString()
  VendorName: string;

  @ApiProperty({ example: 'VendorEmail', description: 'Email of the Vendor' })
  @IsString()
  VendorEmail: string;

  @ApiProperty({ type: [InventoryItemDto], description: 'The inventory of the vendor' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryItemDto)
  Inventory: InventoryItemDto[];

  @ApiProperty({ example: 5, description: 'The rating of the vendor' })
  @IsNumber()
  VendorRating: number;
}
