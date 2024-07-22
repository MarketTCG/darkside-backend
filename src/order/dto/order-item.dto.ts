// src/order/dto/order-item.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductListingDto {
  @ApiProperty({ example: 'product_123', description: 'The product ID' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 'Product Name', description: 'The name of the product' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Product Description', description: 'The description of the product' })
  @IsString()
  description: string;

  @ApiProperty({ example: 1000, description: 'The price of the product in cents' })
  @IsNumber()
  price: number;
}

class VendorListingDto {
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

export class OrderItemDto {
  @ApiProperty({ type: ProductListingDto, description: 'The product listing' })
  @ValidateNested()
  @Type(() => ProductListingDto)
  productListing: ProductListingDto;

  @ApiProperty({ type: VendorListingDto, description: 'The vendor listing' })
  @ValidateNested()
  @Type(() => VendorListingDto)
  vendorListing: VendorListingDto;

  @ApiProperty({ example: 2, description: 'The quantity of the product' })
  @IsNumber()
  quantity: number;
}
