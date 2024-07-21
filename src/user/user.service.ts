import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model'; // Adjust the import path as necessary
import { Role } from '@roles/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
 constructor(@InjectModel('User') private userModel: Model<User>) {}

 async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
 }

 async findUserbyUsername(username: string): Promise<User> {
   return this.userModel.findOne({ Username: username }).exec();
 }

 async findById(id: string): Promise<User> {
  const user = await this.userModel.findById(id).exec();
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
  return user;
}

 async create(createUserDto: CreateUserDto): Promise<User> {
  const createdUser = new this.userModel({
    ...createUserDto,
    roles: [Role.User], // Default role
  });
  return createdUser.save();
}

async assignAdminRole(userId: string): Promise<User> {
  return this.userModel.findByIdAndUpdate(userId, { $addToSet: { roles: Role.Admin } }, { new: true });
}

}
