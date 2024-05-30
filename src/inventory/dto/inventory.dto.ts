// src/inventory/dto/inventory.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class InventoryItemDto {
  @ApiProperty({ example: '12345', description: 'The ID of the card' })
  @IsString()
  CardId: String;

  @ApiProperty({ example: 'Variant1', description: 'The variant of the card' })
  @IsString()
  Variant: String;

  @ApiProperty({ example: 10, description: 'The count of the card' })
  @IsNumber()
  Count: Number;
}

class ListedItemDto {
  @ApiProperty({ example: '12345', description: 'The ID of the card' })
  @IsString()
  CardId: String;

  @ApiProperty({ example: 100, description: 'The price of the listed item' })
  @IsNumber()
  Price: Number;
}

export class InventoryDto {
  @ApiProperty({ type: [InventoryItemDto], description: 'The inventory items' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryItemDto)
  Inventory: InventoryItemDto[];

  @ApiProperty({ type: [ListedItemDto], description: 'The listed items' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ListedItemDto)
  Listed: ListedItemDto[];
}
