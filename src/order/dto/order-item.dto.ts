// src/order/dto/order-item.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { LineItemDto } from "../../stripe/dto/line-item.dto"

class ListingItemDto {
    @ApiProperty({ example: 'product_123', description: 'The product ID' })
    @IsString()
    productId: string;
  
    @ApiProperty({ example: 'Product Name', description: 'The name of the product' })
    @IsString()
    name: string;
  
    @ApiProperty({ example: 1000, description: 'The price of the product in cents' })
    @IsNumber()
    price: number;
  }

class VendorDto {
    @ApiProperty({ example: 'vendor_123', description: 'The vendor ID' })
    @IsString()
    vendorId: string;
  
    @ApiProperty({ example: 'Vendor Name', description: 'The name of the vendor' })
    @IsString()
    name: string;
  
    @ApiProperty({ example: 'vendor@example.com', description: 'The email of the vendor' })
    @IsString()
    email: string;
  }

class ListingsDto {
    @ApiProperty({ type: ListingItemDto, description: 'The product listing' })
    @ValidateNested()
    @Type(() => ListingItemDto)
    productListing: ListingItemDto;

    @ApiProperty({ type: VendorDto, description: 'The vendor listing' })
    @ValidateNested()
    @Type(() => VendorDto)
    vendorListing: VendorDto;

  }
  
  export class OrderItemDto {
    @ApiProperty({ type: ListingsDto, description: 'The listings' })
    @ValidateNested()
    @Type(() => ListingsDto)
    listings: ListingsDto;

    @ApiProperty({ example: 2, description: 'The quantity of the product' })
    @IsNumber()
    quantity: number;
    
    @Type(() => LineItemDto)
    lineItems: LineItemDto;

  }