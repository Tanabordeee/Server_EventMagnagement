import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/user/user.service';  // Adjust path if necessary
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';  // Adjust path if necessary
import { ClubService } from 'src/club/club.service';    // Adjust path if necessary
import { Repository } from 'typeorm';
import { Admin } from 'src/admin/entity/admin.entity';
import { Club } from 'src/club/entity/club.entity';
import { User } from 'src/user/entities/user.entity';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let adminService: AdminService;
  let clubService: ClubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        {
          provide: UsersService,
          useValue: {  
            findByEmail: jest.fn().mockResolvedValue({ email: 'test@example.com' }),
          },
        },
        {
          provide: AdminService,
          useValue: {  
            someMethod: jest.fn().mockResolvedValue('mocked response'),
          },
        },
        {
          provide: Repository,
          useClass: jest.fn().mockImplementation(() => ({  
            findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Admin' }),
          })),
        },
        {
          provide: ClubService,
          useValue: {  // Mock ClubService
            someClubMethod: jest.fn().mockResolvedValue('mocked club response'),  
          },
        },
        {
          provide: Repository,
          useClass: jest.fn().mockImplementation(() => ({  
            findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Club' }),  
          })),
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    adminService = module.get<AdminService>(AdminService);
    clubService = module.get<ClubService>(ClubService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  // Add more tests as needed
});