// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User} from '../user/models/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async register(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({
      username: user.username,
      password: hashedPassword,
      // Other properties...
    });
    return newUser.save();
  }

  async login(user: User): Promise<User> {
    const { user } = await this.jwtService.validateUser(user.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
