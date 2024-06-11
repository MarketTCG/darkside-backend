import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './guard/google-oauth.guard'
import { JwtAuthGuard } from './guard/jwt.guard';
import { Response } from 'express';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from '@roles/roles.decorator'
import { Role } from '@roles/roles.enum';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Get('google')
  @ApiOperation({ summary: 'Initiate Google OAuth' })
  @ApiResponse({ status: 302, description: 'Redirects to Google OAuth' })
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {
    // Initiates Google OAuth
  }

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiResponse({ status: 302, description: 'Handles Google OAuth callback and redirects with JWT token' })
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const jwt = await this.authService.oAuthLogin(req.user);
    res.redirect(`https://darkside-backend-0e876decf5e2.herokuapp.com/oauth?token=${jwt.access_token}`);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user information' })
  @ApiResponse({ status: 200, description: 'Returns the authenticated user information' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getUser(@Req() req) {
    return req.user;
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin only endpoint' })
  @ApiResponse({ status: 200, description: 'Returns admin information' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAdmin(@Req() req) {
    return { message: 'Admin access granted' };
  }
  
  @Get('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 302, description: 'Logs out the user and redirects to home page' })
  @ApiResponse({ status: 500, description: 'Logout failed' })
  async logout(@Req() req, @Res() res: Response) {
    req.logout((err) => {
      if (err) {
        return res.status(500).send({ message: 'Logout failed', error: err });
      }
      res.redirect('/');
    });
  }
}
