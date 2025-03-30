import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

interface Admin {
  id: number;
  adminName: string;
  email: string;
  password?: string;
}

describe('AdminController', () => {
  let controller: AdminController;

  const mockAdminService = {
    findAll: jest.fn<Promise<Admin[]>, []>(() => Promise.resolve([])),
    create: jest.fn(),
    Update: jest.fn(),
    findByEmail: jest.fn(),
    Delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [{ provide: AdminService, useValue: mockAdminService }],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all admins', async () => {
      const expectedResult: Admin[] = [
        { id: 1, adminName: 'Admin 1', email: 'admin1@test.com' },
        { id: 2, adminName: 'Admin 2', email: 'admin2@test.com' }
      ];
      mockAdminService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
      expect(mockAdminService.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new admin', async () => {
      const createAdminDto: CreateAdminDto = {
        adminName: 'Test Admin',
        email: 'admin@test.com',
        password: 'password123'
      };
      const expectedResult = { id: 1, ...createAdminDto };
      mockAdminService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createAdminDto);

      expect(result).toEqual(expectedResult);
      expect(mockAdminService.create).toHaveBeenCalledWith(createAdminDto);
    });
  });

  describe('update', () => {
    it('should update admin profile', async () => {
      const mockUser = { email: 'admin@test.com' };
      const updateAdminDto: UpdateAdminDto = {
        adminName: 'Updated Admin Name',
        email: 'updated@test.com'
      };
      const expectedResult = { id: 1, ...updateAdminDto };
      mockAdminService.Update.mockResolvedValue(expectedResult);

      const result = await controller.update({ user: mockUser }, updateAdminDto);

      expect(result).toEqual(expectedResult);
      expect(mockAdminService.Update).toHaveBeenCalledWith(mockUser.email, updateAdminDto);
    });
  });

  describe('profile', () => {
    it('should return admin profile', async () => {
      const mockUser = { email: 'admin@test.com' };
      const expectedAdmin = { 
        id: 1, 
        adminName: 'Test Admin',
        email: 'admin@test.com'
      };
      mockAdminService.findByEmail.mockResolvedValue(expectedAdmin);

      const result = await controller.profile({ user: mockUser });

      expect(result).toEqual(expectedAdmin);
      expect(mockAdminService.findByEmail).toHaveBeenCalledWith(mockUser.email);
    });
  });

  describe('delete', () => {
    it('should delete admin', async () => {
      const mockUser = { email: 'admin@test.com' };
      const expectedResult = { message: 'Admin deleted successfully' };
      mockAdminService.Delete.mockResolvedValue(expectedResult);

      const result = await controller.delete({ user: mockUser });

      expect(result).toEqual(expectedResult);
      expect(mockAdminService.Delete).toHaveBeenCalledWith(mockUser.email);
    });
  });
});
