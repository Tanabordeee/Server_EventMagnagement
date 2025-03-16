import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Res,
  UnauthorizedException,
  Req,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AdminAuthGuard } from './admin-auth.guard';
import { ClubAuthGuard } from './club-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/userlogin')
  async userlogin(@Request() req, @Res({ passthrough: true }) res) {
    const accessToken = await this.authService.Userlogin(req.user);
    // save to cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true, // production use true
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return { message: 'Login Successfully', user: req.user };
  }

  @Post('/verifyuser')
  async verifyuser(@Body() body: { userId: string }) {
    const user = await this.authService.verifyUser(body.userId);
    if (user) {
      return { isValid: true };
    } else {
      return { isValid: false };
    }
  }
  @Post('/verifyclub')
  async verifyclub(@Body() body: { clubId: string }) {
    const user = await this.authService.verifyClub(body.clubId);
    if (user) {
      return { isValid: true };
    } else {
      return { isValid: false };
    }
  }

  @Post('/verifyadmin')
  async verifyadmin(@Body() body: { adminId: string }) {
    const user = await this.authService.verifyAdmin(body.adminId);
    if (user) {
      return { isValid: true };
    } else {
      return { isValid: false };
    }
  }


  @UseGuards(AdminAuthGuard)
  @Post('/adminlogin')
  async adminlogin(@Request() req, @Res({ passthrough: true }) res) {
    const accessToken = await this.authService.Adminlogin(req.user);
    // save to cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true, // production use true
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return { message: 'Login Successfully' , user: req.user };
  }

  @UseGuards(ClubAuthGuard)
  @Post('/clublogin')
  async clublogin(@Request() req, @Res({ passthrough: true }) res) {
    const accessToken = await this.authService.Clublogin(req.user);
    // save to cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true, // production use true
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return { message: 'Login Successfully' , user: req.user};
  }
}
