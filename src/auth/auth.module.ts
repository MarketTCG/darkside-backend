// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from '../user/schemas/user.schema';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AuthService,
  ],
  providers: [AuthService],
  controllers: [AuthService],
})
export class AuthModule {}
