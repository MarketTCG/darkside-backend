import { Controller, Get } from '@nestjs/common';
import { CardsService } from './cards.service';
import { Card } from './models/card.interface';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  async findAll(): Promise<Card[]> {
    return this.cardsService.findAll();
  }
}