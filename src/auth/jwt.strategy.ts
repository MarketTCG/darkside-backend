import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends JwtService {
  constructor(private readonly jwtService: JwtService) {
    super(jwtService);
  }

  // Implement the required methods...
}