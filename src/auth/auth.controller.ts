import { Controller, Get, Post, Body, Patch, Param, Delete ,Request, UseGuards , Res, UnauthorizedException, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AdminAuthGuard } from './admin-auth.guard';
import { ClubAuthGuard } from './club-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post("/userlogin")
  async userlogin(@Request() req , @Res({passthrough:true}) res){
    const accessToken = await this.authService.Userlogin(req.user);
    // save to cookie
    res.cookie("accessToken", accessToken , {
      httpOnly:true,
      secure: true, // production use true
      sameSite: 'None',
    });
    return {message : "Login Successfully" , user: req.user};
  }

  @Get('/verify')
async verifyToken(@Req() req, @Res({ passthrough: true }) res) {

  const token = req.cookies['accessToken'];
  if (!token) throw new UnauthorizedException();

  const user = await this.authService.verifyToken(token); 
  return { user };
}

  @UseGuards(AdminAuthGuard)
  @Post("/adminlogin")
  async adminlogin(@Request() req , @Res({passthrough:true}) res){
    const accessToken = await this.authService.Adminlogin(req.user);
    // save to cookie
    res.cookie("accessToken", accessToken , {
      httpOnly:true,
      secure: true, // production use true
      sameSite: 'None',
    });
    return {message : "Login Successfully"};
  }

  @UseGuards(ClubAuthGuard)
  @Post("/clublogin")
  async clublogin(@Request() req , @Res({passthrough:true}) res){
    const accessToken = await this.authService.Clublogin(req.user);
    // save to cookie
    res.cookie("accessToken", accessToken , {
      httpOnly:true,
      secure: true, // production use true
      sameSite: 'None',
    });
    return {message : "Login Successfully"};
  }
}
