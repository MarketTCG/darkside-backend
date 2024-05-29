// src/auth/dto/sign-in.dto.ts
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'testusername', description: 'The username of the user' })
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 'testpassword', description: 'The password of the user' })
  @IsString()
  readonly password: string;
}
