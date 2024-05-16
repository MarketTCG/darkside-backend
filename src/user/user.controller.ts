import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.model'; // Adjust the import path as necessary

@Controller('users')
export class UserController {
 constructor(private readonly userService: UserService) {}

 @Get()
 async findAll(): Promise<User[]> {
    return this.userService.findAll();
 }


}
