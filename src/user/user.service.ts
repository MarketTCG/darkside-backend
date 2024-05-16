import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model'; // Adjust the import path as necessary

@Injectable()
export class UserService {
 constructor(@InjectModel('User') private userModel: Model<User>) {}

 async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
 }



}
