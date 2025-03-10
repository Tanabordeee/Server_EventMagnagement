import { Test, TestingModule } from '@nestjs/testing';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';

describe('ClubController', () => {
  let controller: ClubController;

  // Mock ClubService
  const mockClubService = {
    findAll: jest.fn(() => ['club1', 'club2']),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubController],
      providers: [
        { provide: ClubService, useValue: mockClubService }, // Mock ClubService
      ],
    }).compile();

    controller = module.get<ClubController>(ClubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
