import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Patch,
  Delete,
  UseGuards,
  Request,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/register")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async findOne(@Request() req) {
    const user =await this.usersService.findByEmail(req.user.email);
    if(!user){
      throw new HttpException("User not found" , HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Patch("/update")
  @UseGuards(JwtAuthGuard)
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(req.user.email, updateUserDto);
    if(!user){
      throw new HttpException("User not found" , HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Delete('/delete')
  @UseGuards(JwtAuthGuard)
  async remove(@Request() req) {
    const user = await this.usersService.remove(req.user.email);
    if(!user){
      throw new HttpException("User not found" , HttpStatus.NOT_FOUND);
    }
    return user;
  }
}