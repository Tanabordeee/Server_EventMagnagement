import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { ClubService } from '../club/club.service';
import { UsersService } from 'src/user/user.service';
import { UnauthorizedException } from '@nestjs/common';

interface User {
  userId: string;
  email: string;
  password: string;
}

interface Admin {
  adminID: string;
  email: string;
  password: string;
}

interface Club {
  clubID: string;
  email: string;
  password: string;
}

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    findOne: jest.fn(),
  };

  const mockAdminService = {
    findByEmail: jest.fn(),
    findOne: jest.fn(),
  };

  const mockClubService = {
    findByEmail: jest.fn(),
    findOne: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: AdminService, useValue: mockAdminService },
        { provide: ClubService, useValue: mockClubService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Userlogin', () => {
    it('should return JWT token for valid user', async () => {
      const mockUser: User = {
        userId: '1',
        email: 'user@test.com',
        password: 'password123'
      };
      const mockToken = 'mock.jwt.token';

      mockJwtService.sign.mockReturnValue(mockToken);

      const result = await service.Userlogin(mockUser);

      expect(result).toBe(mockToken);
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        {
          email: mockUser.email,
          sub: mockUser.userId
        },
        { expiresIn: '7d' }
      );
    });
  });

  describe('Adminlogin', () => {
    it('should return JWT token for valid admin', async () => {
      const mockAdmin: Admin = {
        adminID: '1',
        email: 'admin@test.com',
        password: 'password123'
      };
      const mockToken = 'mock.jwt.token';

      mockJwtService.sign.mockReturnValue(mockToken);

      const result = await service.Adminlogin(mockAdmin);

      expect(result).toBe(mockToken);
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        {
          email: mockAdmin.email,
          sub: mockAdmin.adminID
        },
        { expiresIn: '7d' }
      );
    });
  });

  describe('Clublogin', () => {
    it('should return JWT token for valid club', async () => {
      const mockClub: Club = {
        clubID: '1',
        email: 'club@test.com',
        password: 'password123'
      };
      const mockToken = 'mock.jwt.token';

      mockJwtService.sign.mockReturnValue(mockToken);

      const result = await service.Clublogin(mockClub);

      expect(result).toBe(mockToken);
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        {
          email: mockClub.email,
          sub: mockClub.clubID
        },
        { expiresIn: '7d' }
      );
    });
  });

  describe('verifyUser', () => {
    it('should return user when found', async () => {
      const userId = '123';
      const mockUser: User = {
        userId: userId,
        email: 'user@test.com',
        password: 'password123'
      };

      mockUsersService.findOne.mockResolvedValue(mockUser);

      const result = await service.verifyUser(userId);

      expect(result).toEqual(mockUser);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(userId);
    });

    it('should throw UnauthorizedException when user not found', async () => {
      const userId = '999';
      mockUsersService.findOne.mockRejectedValue(new Error());

      await expect(service.verifyUser(userId)).rejects.toThrow(UnauthorizedException);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(userId);
    });
  });

  describe('verifyAdmin', () => {
    it('should return admin when found', async () => {
      const adminId = '123';
      const mockAdmin: Admin = {
        adminID: adminId,
        email: 'admin@test.com',
        password: 'password123'
      };

      mockAdminService.findOne.mockResolvedValue(mockAdmin);

      const result = await service.verifyAdmin(adminId);

      expect(result).toEqual(mockAdmin);
      expect(mockAdminService.findOne).toHaveBeenCalledWith(adminId);
    });

    it('should throw UnauthorizedException when admin not found', async () => {
      const adminId = '999';
      mockAdminService.findOne.mockRejectedValue(new Error());

      await expect(service.verifyAdmin(adminId)).rejects.toThrow(UnauthorizedException);
      expect(mockAdminService.findOne).toHaveBeenCalledWith(adminId);
    });
  });

  describe('verifyClub', () => {
    it('should return club when found', async () => {
      const clubId = '123';
      const mockClub: Club = {
        clubID: clubId,
        email: 'club@test.com',
        password: 'password123'
      };

      mockClubService.findOne.mockResolvedValue(mockClub);

      const result = await service.verifyClub(clubId);

      expect(result).toEqual(mockClub);
      expect(mockClubService.findOne).toHaveBeenCalledWith(clubId);
    });

    it('should throw UnauthorizedException when club not found', async () => {
      const clubId = '999';
      mockClubService.findOne.mockRejectedValue(new Error());

      await expect(service.verifyClub(clubId)).rejects.toThrow(UnauthorizedException);
      expect(mockClubService.findOne).toHaveBeenCalledWith(clubId);
    });
  });
});
