// src/vendor/dto/remove-inventory.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class RemoveInventoryDto {
  @ApiProperty({ type: [String], description: 'Array of inventory item IDs to remove' })
  @IsArray()
  @IsString({ each: true })
  itemIds: string[];
}