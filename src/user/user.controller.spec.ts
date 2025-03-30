import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './UsersController';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

interface User {
  userId: string;
  username: string;
  email: string;
  password?: string;
  created?: Date;
  events?: any[];
  hashpassword?: () => Promise<void>;
}

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn(),
    findOne: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const expectedResult: User = {
        userId: uuidv4(),
        username: createUserDto.username,
        email: createUserDto.email,
        password: 'hashedpassword',
        created: new Date(),
        events: [],
        hashpassword: jest.fn(),
      };

      mockUsersService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createUserDto);

      expect(result).toEqual(expectedResult);
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findOne', () => {
    it('should return user profile', async () => {
      const mockUser: User = {
        userId: uuidv4(),
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        created: new Date(),
        events: [],
        hashpassword: jest.fn(),
      };

      const mockRequest = {
        user: {
          email: 'test@example.com',
        },
      };

      mockUsersService.findByEmail.mockResolvedValue(mockUser);

      const result = await controller.findOne(mockRequest);

      expect(result).toEqual(mockUser);
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(mockRequest.user.email);
    });

    it('should throw HttpException when user not found', async () => {
      const mockRequest = {
        user: {
          email: 'nonexistent@example.com',
        },
      };

      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(controller.findOne(mockRequest)).rejects.toThrow('User not found');
    });
  });

  describe('update', () => {
    it('should update user profile', async () => {
      const updateUserDto: UpdateUserDto = {
        username: 'updateduser',
      };

      const mockUser: User = {
        userId: uuidv4(),
        username: updateUserDto.username || 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        created: new Date(),
        events: [],
        hashpassword: jest.fn(),
      };

      const mockRequest = {
        user: {
          email: 'test@example.com',
        },
      };

      mockUsersService.update.mockResolvedValue(mockUser);

      const result = await controller.update(mockRequest, updateUserDto);

      expect(result).toEqual(mockUser);
      expect(mockUsersService.update).toHaveBeenCalledWith(mockRequest.user.email, updateUserDto);
    });

    it('should throw HttpException when user not found', async () => {
      const updateUserDto: UpdateUserDto = {
        username: 'updateduser',
      };

      const mockRequest = {
        user: {
          email: 'nonexistent@example.com',
        },
      };

      mockUsersService.update.mockResolvedValue(null);

      await expect(controller.update(mockRequest, updateUserDto)).rejects.toThrow('User not found');
    });
  });

  describe('remove', () => {
    it('should remove user', async () => {
      const mockUser: User = {
        userId: uuidv4(),
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        created: new Date(),
        events: [],
        hashpassword: jest.fn(),
      };

      const mockRequest = {
        user: {
          email: 'test@example.com',
        },
      };

      mockUsersService.remove.mockResolvedValue(mockUser);

      const result = await controller.remove(mockRequest);

      expect(result).toEqual(mockUser);
      expect(mockUsersService.remove).toHaveBeenCalledWith(mockRequest.user.email);
    });

    it('should throw HttpException when user not found', async () => {
      const mockRequest = {
        user: {
          email: 'nonexistent@example.com',
        },
      };

      mockUsersService.remove.mockResolvedValue(null);

      await expect(controller.remove(mockRequest)).rejects.toThrow('User not found');
    });
  });
});
