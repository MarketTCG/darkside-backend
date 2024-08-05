import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { LineItemDto } from './line-item.dto';

export class StripeCheckoutDto {
  
  @ApiProperty({ example: [{ name: 'Product1', unitAmount: 1899, quantity: 2 }] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LineItemDto)
  lineItems: LineItemDto[];

  @ApiProperty({ example: 'USD', description: 'Currency of the transaction' })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({ example: 'https://example.com/success', description: 'URL to redirect to upon successful payment' })
  @IsString()
  @IsNotEmpty()
  successUrl: string;

  @ApiProperty({ example: 'https://example.com/cancel', description: 'URL to redirect to upon canceled payment' })
  @IsString()
  @IsNotEmpty()
  cancelUrl: string;
}