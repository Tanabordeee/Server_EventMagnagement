import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entity/admin.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
@Injectable()
export class AdminService {
    constructor(@InjectRepository(Admin) private readonly AdminRepository: Repository<Admin>){}
    async create(createAdminDto : CreateAdminDto): Promise<Admin| null>{
        const Admin = this.AdminRepository.create(createAdminDto);
        return this.AdminRepository.save(Admin);
    }
    async findAll(): Promise<Admin[]>{
        return await this.AdminRepository.find({relations:["events"]});
    }
    async Update(email : string , UpdateAdminDto : UpdateAdminDto): Promise<Admin | null>{
        const Admin = await this.AdminRepository.findOne({where:{email}});
        if (!Admin) return null;
        Object.assign(Admin , UpdateAdminDto)
        return await this.AdminRepository.save(Admin);
    }

    async findByEmail(email : string): Promise<Admin | null>{
        const Admin = await this.AdminRepository.findOne({where:{email} , relations:["events"]});
        if(!Admin) return null;
        return Admin;
    }

    async Delete(email : string): Promise<Admin | null>{
        const Admin = await this.AdminRepository.findOne({where:{email}});
        if (!Admin) return null;
        await this.AdminRepository.remove(Admin);
        return Admin;
    }
}
