import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './models/card.interface';

@Injectable()
export class CardsService {
  constructor(@InjectModel('Card') private readonly cardModel: Model<Card>) {}

  async findAll(): Promise<Card[]> {
    return this.cardModel.find().exec();
  }
}