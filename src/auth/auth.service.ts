import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../user/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async oAuthLogin(user: any) {
    const userDB = await this.userModel.findOne({ email: user.email }).exec();
    if (!userDB) {
      throw new Error('User not found');
    }
    const payload = { email: userDB.email, sub: userDB._id.toString(), roles: userDB.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };

  }


}