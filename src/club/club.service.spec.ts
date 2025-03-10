import { Test, TestingModule } from '@nestjs/testing';
import { ClubService } from './club.service';

describe('ClubService', () => {
  let service: ClubService;

  const mockClubRepository = {
    // mock ฟังก์ชันของ ClubRepository เช่น findOne, save
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClubService,
        { provide: 'ClubRepository', useValue: mockClubRepository }, //  Mock Repository
      ],
    }).compile();

    service = module.get<ClubService>(ClubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
