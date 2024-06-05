// src/card/card.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card } from './models/card.model';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectModel('Card') private readonly cardModel: Model<Card>
  ) {}

  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    const newCard = new this.cardModel(createCardDto);
    return newCard.save();
  }

  async getCardById(id: string): Promise<Card> {
    const card = await this.cardModel.findById(id).exec();
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    return card;
  }
}
