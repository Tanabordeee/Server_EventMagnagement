import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['notifications', 'favorite', 'events'] });
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { userId: id },
      relations: ['notifications', 'favorite', 'events'],
    });
  }

  async findByEmail(email:string): Promise<User | null>{
    return await this.userRepository.findOne({
      where:{email},
      relations:['notifications', 'favorite', 'events']
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { userId: id } });
    if (!user) return null;

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return null;
    await this.userRepository.remove(user);
    return user;
  }
}
