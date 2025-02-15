import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Patch,
  Delete,
  UseGuards,
  Request
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

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  findOne(@Request() req) {
    const user = this.usersService.findByEmail(req.user.email);
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  remove(@Request() req) {
    return this.usersService.remove(req.user.email);
  }
}