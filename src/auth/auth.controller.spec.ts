import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { ClubService } from 'src/club/club.service';
import { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    Userlogin: jest.fn(),
    Adminlogin: jest.fn(),
    Clublogin: jest.fn(),
    verifyUser: jest.fn(),
    verifyAdmin: jest.fn(),
    verifyClub: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: AdminService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: ClubService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        JwtService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('userlogin', () => {
    it('should login user and set cookie', async () => {
      const mockUser = { email: 'user@test.com' };
      const mockToken = 'mock.jwt.token';
      const mockResponse = {
        cookie: jest.fn(),
      } as unknown as Response;

      mockAuthService.Userlogin.mockResolvedValue(mockToken);

      const result = await controller.userlogin({ user: mockUser }, mockResponse);

      expect(result).toEqual({
        message: 'Login Successfully',
        user: mockUser,
      });
      expect(mockAuthService.Userlogin).toHaveBeenCalledWith(mockUser);
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'accessToken',
        mockToken,
        expect.any(Object)
      );
    });
  });

  describe('verifyuser', () => {
    it('should return isValid true when user exists', async () => {
      const userId = '123';
      mockAuthService.verifyUser.mockResolvedValue({ id: userId });

      const result = await controller.verifyuser({ userId });

      expect(result).toEqual({ isValid: true });
      expect(mockAuthService.verifyUser).toHaveBeenCalledWith(userId);
    });

    it('should return isValid false when user does not exist', async () => {
      const userId = '999';
      mockAuthService.verifyUser.mockResolvedValue(null);

      const result = await controller.verifyuser({ userId });

      expect(result).toEqual({ isValid: false });
      expect(mockAuthService.verifyUser).toHaveBeenCalledWith(userId);
    });
  });

  describe('verifyclub', () => {
    it('should return isValid true when club exists', async () => {
      const clubId = '123';
      mockAuthService.verifyClub.mockResolvedValue({ id: clubId });

      const result = await controller.verifyclub({ clubId });

      expect(result).toEqual({ isValid: true });
      expect(mockAuthService.verifyClub).toHaveBeenCalledWith(clubId);
    });

    it('should return isValid false when club does not exist', async () => {
      const clubId = '999';
      mockAuthService.verifyClub.mockResolvedValue(null);

      const result = await controller.verifyclub({ clubId });

      expect(result).toEqual({ isValid: false });
      expect(mockAuthService.verifyClub).toHaveBeenCalledWith(clubId);
    });
  });

  describe('verifyadmin', () => {
    it('should return isValid true when admin exists', async () => {
      const adminId = '123';
      mockAuthService.verifyAdmin.mockResolvedValue({ id: adminId });

      const result = await controller.verifyadmin({ adminId });

      expect(result).toEqual({ isValid: true });
      expect(mockAuthService.verifyAdmin).toHaveBeenCalledWith(adminId);
    });

    it('should return isValid false when admin does not exist', async () => {
      const adminId = '999';
      mockAuthService.verifyAdmin.mockResolvedValue(null);

      const result = await controller.verifyadmin({ adminId });

      expect(result).toEqual({ isValid: false });
      expect(mockAuthService.verifyAdmin).toHaveBeenCalledWith(adminId);
    });
  });

  describe('adminlogin', () => {
    it('should login admin and set cookie', async () => {
      const mockAdmin = { email: 'admin@test.com' };
      const mockToken = 'mock.jwt.token';
      const mockResponse = {
        cookie: jest.fn(),
      } as unknown as Response;

      mockAuthService.Adminlogin.mockResolvedValue(mockToken);

      const result = await controller.adminlogin({ user: mockAdmin }, mockResponse);

      expect(result).toEqual({
        message: 'Login Successfully',
        user: mockAdmin,
      });
      expect(mockAuthService.Adminlogin).toHaveBeenCalledWith(mockAdmin);
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'accessToken',
        mockToken,
        expect.any(Object)
      );
    });
  });

  describe('clublogin', () => {
    it('should login club and set cookie', async () => {
      const mockClub = { email: 'club@test.com' };
      const mockToken = 'mock.jwt.token';
      const mockResponse = {
        cookie: jest.fn(),
      } as unknown as Response;

      mockAuthService.Clublogin.mockResolvedValue(mockToken);

      const result = await controller.clublogin({ user: mockClub }, mockResponse);

      expect(result).toEqual({
        message: 'Login Successfully',
        user: mockClub,
      });
      expect(mockAuthService.Clublogin).toHaveBeenCalledWith(mockClub);
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'accessToken',
        mockToken,
        expect.any(Object)
      );
    });
  });
});