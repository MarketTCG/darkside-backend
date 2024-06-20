import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdateQuantityDto {
  @ApiProperty({ example: '666fccac8a495eba3b996d8f', description: 'The ID of the inventory item' })
  @IsString()
  _id: string;

  @ApiProperty({ example: 5, description: 'The new quantity of the product' })
  @IsNumber()
  Quantity: number;
}