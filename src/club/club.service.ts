import { Injectable } from '@nestjs/common';
import { Club } from './entity/club.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
@Injectable()
export class ClubService {
    constructor(@InjectRepository(Club) private readonly ClubRepository: Repository<Club>){}

    async Create(CreateClubDto : CreateClubDto): Promise<Club> {
        const Club = await this.ClubRepository.create(CreateClubDto);
        return this.ClubRepository.save(Club); 
    }

    async findAll(): Promise<Club[]>{
        return this.ClubRepository.find({relations:["events"]});
    }

  async findOne(id: string): Promise<Club | null> {
    return await this.ClubRepository.findOne({
      where: { clubID: id },
      relations: ['notifications', 'favorite', 'events'],
    });
  }

  async findByEmail(email:string): Promise<Club | null>{
    return await this.ClubRepository.findOne({
      where:{email},
      relations:['events']
    });
  }

  async update(email : string, UpdateClubDto: UpdateClubDto): Promise<Club | null> {
    const user = await this.ClubRepository.findOne({ where: { email } });
    if (!user) return null;

    Object.assign(user, UpdateClubDto);
    return await this.ClubRepository.save(user);
  }

  async remove(email: string): Promise<Club | null> {
    const user = await this.ClubRepository.findOne({ where: { email } });
    if (!user) return null;
    await this.ClubRepository.remove(user);
    return user;
  }
}
