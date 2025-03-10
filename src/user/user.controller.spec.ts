import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './UsersController';
import { UsersService } from './user.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    // Mock ฟังก์ชันของ UsersService เช่น findAll, findOne
    findAll: jest.fn(() => ['user1', 'user2']),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService }, //  Mock UsersService
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
