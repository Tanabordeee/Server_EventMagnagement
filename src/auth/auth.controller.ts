import { Controller, Get, Post, Body, Patch, Param, Delete ,Request, UseGuards , Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() req , @Res({passthrough:true}) res){
    const accessToken = await this.authService.login(req.user);
    // save to cookie
    res.cookie("accessToken", accessToken , {
      httpOnly:true,
    });
    return {message : "Login Successfully"};
  }
}
