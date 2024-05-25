// src/auth/auth.service.ts
import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../user/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async register(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.Password, 10);
    const newUser = new this.userModel({
      username: user.Username,
      password: hashedPassword,
      // Other properties...
    });
    return newUser.save();
  }

  async signIn(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({username});
    if (user?.Password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.Username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
