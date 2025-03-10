import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { ClubService } from '../club/club.service';
import { UsersService } from 'src/user/user.service';

// Mock UsersService
const mockUsersService = {
  // เพิ่มฟังก์ชัน mock สำหรับการทดสอบ
  findUserById: jest.fn().mockResolvedValue({ id: 1, username: 'testuser' }),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('mockJwtToken'),
};

const mockAdminService = {
  // Mock methods for AdminService if needed
};

const mockClubService = {
  // Mock methods for ClubService if needed
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService }, // Mock UsersService
        { provide: JwtService, useValue: mockJwtService }, // Mock JwtService
        { provide: AdminService, useValue: mockAdminService }, // Mock AdminService
        { provide: ClubService, useValue: mockClubService }, // Mock ClubService
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
