// src/card/card.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @ApiBody({ type: CreateCardDto })
  @ApiResponse({ status: 201, description: 'The card has been successfully created.' })
  async createCard(
    @Body() createCardDto: CreateCardDto
  ) {
    return this.cardService.createCard(createCardDto);
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'The ID of the card' })
  @ApiResponse({ status: 200, description: 'The card has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  async getCardById(
    @Param('id') id: string
  ) {
    return this.cardService.getCardById(id);
  }
}
