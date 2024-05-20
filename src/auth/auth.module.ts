// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/models/user.model';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register(JwtStrategy),
    AuthService,
  ],
  providers: [AuthService],
  controllers: [AuthService],
})
export class AuthModule {}
