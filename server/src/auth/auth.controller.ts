import { Body, Controller, Get, Post, Req, Res, UseGuards, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Req() req: Request) {
    const user = req.user as any;
    return this.authService.getUserById(user.userId);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // handled by passport, no implementation needed
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as any;

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        hasUsername: !!user.username,
      },
      jwtSecret,
      { expiresIn: '1d' }
    );


    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }

  @Patch('set-username')
  @UseGuards(AuthGuard('jwt'))
  async setUsername(@Body() body: { username: string }, @Req() req: Request) {
    const user = req.user as { userId: string };

    return this.prisma.user.update({
      where: { id: user.userId },
      data: { username: body.username },
    });
  }


}
