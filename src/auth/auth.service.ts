import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import * as bcrypt from "bcrypt";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService , 
    @InjectRepository(User) private readonly AuthRepository:Repository<User>,
  private jwtService:JwtService){}
  async validateUser(email:string , password:string):Promise<User | null>{
    const user = await this.usersService.findByEmail(email);
    if(user && (await bcrypt.compare(password , user.password))){
      return user;
    }
    return null;
  }
  async login(user:any){
      const payload = {username: user.email , sub:user.userId};
      return this.jwtService.sign(payload)
  }
}
