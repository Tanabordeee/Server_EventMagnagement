import { Controller, Get, Post, UseGuards , Request, Body, Patch , Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
@Controller('admin')
export class AdminController {
    constructor(private readonly AdminService : AdminService){}
    @UseGuards(JwtAuthGuard)
    @Get("/")
    findAll(){
        return this.AdminService.findAll();
    }
    
    @Post("/register")
    create(@Body() CreateAdminDto : CreateAdminDto){
        return this.AdminService.create(CreateAdminDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/update")
    update(@Request() req ,@Body() UpdateAdminDto : UpdateAdminDto){
        console.log(req);
        return this.AdminService.Update(req.user.email , UpdateAdminDto)
    }
    
    @UseGuards(JwtAuthGuard)
    @Get("/profile")
    profile(@Request() req){
        return this.AdminService.findByEmail(req.user.email);
    }
    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    delete(@Request() req){
        return this.AdminService.Delete(req.user.email);
    }
}
