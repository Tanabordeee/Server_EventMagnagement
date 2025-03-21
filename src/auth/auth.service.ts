import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import * as bcrypt from "bcrypt";
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/entity/admin.entity';
import { Club } from 'src/club/entity/club.entity';
import { ClubService } from 'src/club/club.service';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
  private jwtService:JwtService , 
  private AdminService : AdminService , private ClubService:ClubService){}
  async validateUser(email:string , password:string):Promise<User | null>{
    const user = await this.usersService.findByEmail(email);
    if(user && (await bcrypt.compare(password , user.password))){
      return user;
    }
    return null;
  }
  async Userlogin(user:any){
      const payload = {email: user.email , sub:user.userId};
      return this.jwtService.sign(payload, { expiresIn: '7d' })
  }

  async validateAdmin(email:string , password:string):Promise<Admin | null>{
    const admin = await this.AdminService.findByEmail(email);
    if(admin && (await bcrypt.compare(password , admin.password))){
      return admin;
    }
    return null;
  }

  async Adminlogin(admin:any){
    const payload = {email: admin.email , sub:admin.adminID};
    return this.jwtService.sign(payload, { expiresIn: '7d' })
  }

  async validateClub(email:string , password:string):Promise<Club | null>{
    const Club = await this.ClubService.findByEmail(email);
    if(Club && (await bcrypt.compare(password , Club.password))){
      return Club;
    }
    return null;
  }

  async Clublogin(Club:any){
    const payload = {email: Club.email , sub:Club.clubID};
    return this.jwtService.sign(payload, { expiresIn: '7d' })
  }

  async verifyUser(Id: string) {
    try {
      const payload = await this.usersService.findOne(Id);
      return payload;
    } catch (e) {
      throw new UnauthorizedException('Invalid User');
    }
  }
  
  async verifyClub(Id: string) {
    try {
      console.log(Id);
      const payload = await this.ClubService.findOne(Id);
      return payload;
    } catch (e) {
      throw new UnauthorizedException('Invalid Club');
    }
  }
  async verifyAdmin(Id: string) {
    try {
      const payload = await this.AdminService.findOne(Id);
      return payload;
    } catch (e) {
      throw new UnauthorizedException('Invalid Admin');
    }
  }
}
