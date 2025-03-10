import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './user.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    // Mock ฟังก์ชันของ UserRepository เช่น find, save
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'UserRepository', useValue: mockUserRepository }, // ✅ Mock UserRepository
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
