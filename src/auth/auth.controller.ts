import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './guard/google-oauth.guard'
import { JwtAuthGuard } from './guard/jwt.guard';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {
    // Initiates Google OAuth
  }

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const jwt = await this.authService.oAuthLogin(req.user);
    res.redirect(`http://localhost:3000/oauth?token=${jwt.access_token}`);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req) {
    return req.user;
  }

  @Get('logout')
  async logout(@Req() req, @Res() res: Response) {
    req.logout((err) => {
      if (err) {
        return res.status(500).send({ message: 'Logout failed', error: err });
      }
      res.redirect('/');
    });
  }
}
