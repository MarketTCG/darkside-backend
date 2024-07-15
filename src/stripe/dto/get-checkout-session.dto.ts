// src/stripe/dto/get-checkout-session.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetCheckoutSessionDto {
  @ApiProperty({ example: 'cs_test_a1b2c3d4e5f6g7h8i9j0', description: 'The ID of the checkout session' })
  @IsString()
  sessionId: string;
}
