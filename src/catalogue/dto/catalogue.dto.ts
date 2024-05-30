// src/catalogue/dto/catalogue.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray, IsOptional } from 'class-validator';

export class CatalogueDto {
  @ApiProperty({ example: 'SOR', description: 'The set of the catalogue item' })
  @IsString()
  Set: string;

  @ApiProperty({ example: '001', description: 'The number of the catalogue item' })
  @IsString()
  Number: string;

  @ApiProperty({ example: 'Card Name', description: 'The name of the catalogue item' })
  @IsString()
  Name: string;

  @ApiProperty({ example: 'Unit', description: 'The type of the catalogue item' })
  @IsString()
  Type: string;

  @ApiProperty({ example: ['Vigilance', 'Villany'], description: 'The aspects of the catalogue item' })
  @IsArray()
  @IsString({ each: true })
  Aspects: string[];

  @ApiProperty({ example: ['IMPERIAL', 'VEHICLE'], description: 'The traits of the catalogue item' })
  @IsArray()
  @IsString({ each: true })
  Traits: string[];

  @ApiProperty({ example: ['Ground'], description: 'The arenas of the catalogue item' })
  @IsArray()
  @IsString({ each: true })
  Arenas: string[];

  @ApiProperty({ example: '1', description: 'The cost of the catalogue item' })
  @IsString()
  Cost: string;

  @ApiProperty({ example: '1', description: 'The power of the catalogue item' })
  @IsString()
  Power: string;

  @ApiProperty({ example: '1', description: 'The HP of the catalogue item' })
  @IsString()
  Hp: string;

  @ApiProperty({ example: 'Some front text', description: 'The front text of the catalogue item' })
  @IsString()
  FrontText: string;

  @ApiProperty({ example: true, description: 'Whether the item is double-sided' })
  @IsBoolean()
  DoubleSided: boolean;

  @ApiProperty({ example: 'Common', description: 'The rarity of the catalogue item' })
  @IsString()
  Rarity: string;

  @ApiProperty({ example: true, description: 'Whether the item is unique' })
  @IsBoolean()
  Unique: boolean;

  @ApiProperty({ example: 'Artist Name', description: 'The artist of the catalogue item' })
  @IsString()
  Artist: string;

  @ApiProperty({ example: 'http://example.com/art.jpg', description: 'The front art URL of the catalogue item' })
  @IsString()
  FrontArt: string;

  @ApiProperty({ example: 'Normal', description: 'The variant type of the catalogue item' })
  @IsString()
  VariantType: string;

  @ApiProperty({ example: '20.00', description: 'The market price of the catalogue item' })
  @IsString()
  MarketPrice: string;
}
