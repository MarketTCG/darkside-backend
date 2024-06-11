// user/dto/create-user.dto.ts
import { IsString, IsEmail, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';
import { Role } from '@roles/roles.enum'; // Adjust the import path as necessary

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  googleId?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  roles?: Role[];
}
