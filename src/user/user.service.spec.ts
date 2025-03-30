import { Test, TestingModule } from '@nestjs/testing';
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

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'UserRepository', useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser: User = {
        userId: uuidv4(),
        username: createUserDto.username,
        email: createUserDto.email,
        password: 'hashedpassword',
        created: new Date(),
        events: [],
        hashpassword: jest.fn(),
      };

      mockUserRepository.create.mockReturnValue(mockUser);
      mockUserRepository.save.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return all users with their events', async () => {
      const mockUsers: User[] = [
        {
          userId: uuidv4(),
          username: 'user1',
          email: 'user1@example.com',
          password: 'hashedpassword1',
          created: new Date(),
          events: [],
          hashpassword: jest.fn(),
        },
        {
          userId: uuidv4(),
          username: 'user2',
          email: 'user2@example.com',
          password: 'hashedpassword2',
          created: new Date(),
          events: [],
          hashpassword: jest.fn(),
        },
      ];

      mockUserRepository.find.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(result).toEqual(mockUsers);
      expect(mockUserRepository.find).toHaveBeenCalledWith({ relations: ['events'] });
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const userId = uuidv4();
      const mockUser: User = {
        userId: userId,
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        created: new Date(),
        events: [],
        hashpassword: jest.fn(),
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne(userId);

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { userId },
        relations: ['events'],
      });
    });

    it('should return null when user not found', async () => {
      const userId = uuidv4();
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne(userId);

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'test@example.com';
      const mockUser: User = {
        userId: uuidv4(),
        username: 'testuser',
        email: email,
        password: 'hashedpassword',
        created: new Date(),
        events: [],
        hashpassword: jest.fn(),
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findByEmail(email);

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email },
        relations: ['events'],
      });
    });

    it('should return null when user not found', async () => {
      const email = 'nonexistent@example.com';
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await service.findByEmail(email);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const email = 'test@example.com';
      const updateUserDto: UpdateUserDto = {
        username: 'updateduser',
      };

      const mockUser: User = {
        userId: uuidv4(),
        username: 'testuser',
        email: email,
        password: 'hashedpassword',
        created: new Date(),
        events: [],
        hashpassword: jest.fn(),
      };

      const updatedUser: User = {
        userId: mockUser.userId,
        username: updateUserDto.username || mockUser.username,
        email: mockUser.email,
        password: mockUser.password,
        created: mockUser.created,
        events: mockUser.events,
        hashpassword: mockUser.hashpassword,
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockUserRepository.save.mockResolvedValue(updatedUser);

      const result = await service.update(email, updateUserDto);

      expect(result).toEqual(updatedUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(mockUserRepository.save).toHaveBeenCalledWith(updatedUser);
    });

    it('should return null when user not found', async () => {
      const email = 'nonexistent@example.com';
      const updateUserDto: UpdateUserDto = {
        username: 'updateduser',
      };

      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await service.update(email, updateUserDto);

      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const email = 'test@example.com';
      const mockUser: User = {
        userId: uuidv4(),
        username: 'testuser',
        email: email,
        password: 'hashedpassword',
        created: new Date(),
        events: [],
        hashpassword: jest.fn(),
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockUserRepository.remove.mockResolvedValue(mockUser);

      const result = await service.remove(email);

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(mockUserRepository.remove).toHaveBeenCalledWith(mockUser);
    });

    it('should return null when user not found', async () => {
      const email = 'nonexistent@example.com';
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await service.remove(email);

      expect(result).toBeNull();
    });
  });
});