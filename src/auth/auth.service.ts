import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../user/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async signIn(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({ username });
  
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }
    
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signInEmail(email: string): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({ email });

    if (!user?.email) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, username: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({
      username: user.username,
      password: hashedPassword,
      email: user.email
    });
    return newUser.save();
  }

  async validateGoogleUser(googleId: string, email: string, firstName: string, lastName: string, picture: string): Promise<{ access_token: string }> {
    let user = await this.userModel.findOne({ googleId });

    if (!user) {
      user = new this.userModel({
        googleId,
        email,
        firstName,
        lastName,
        picture
      });
      await user.save();
    }

    const payload = { sub: user._id, username: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}