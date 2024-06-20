import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdatePriceDto {
  @ApiProperty({ example: '666fccac8a495eba3b996d8f', description: 'The ID of the inventory item' })
  @IsString()
  _id: string;

  @ApiProperty({ example: 100, description: 'The new price of the product' })
  @IsNumber()
  Price: number;
}