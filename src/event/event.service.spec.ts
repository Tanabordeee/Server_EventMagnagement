import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;

  // Mock dependencies
  const mockUserRepository = {
    findOne: jest.fn().mockResolvedValue({ id: 1, name: 'User 1' }),
  };

  const mockEventRepository = {
    // Mock methods from EventRepository
    save: jest.fn().mockResolvedValue({ id: 1, name: 'Event 1' }),
    findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Event 1' }),
  };

  const mockEventUserService = {
    getUserEvents: jest.fn().mockResolvedValue([{ eventId: 1, userId: 1 }]),
  };

  const mockEventClubService = {
    getClubEvents: jest.fn().mockResolvedValue([{ eventId: 1, clubId: 1 }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        { provide: 'UserRepository', useValue: mockUserRepository },
        { provide: 'EventRepository', useValue: mockEventRepository }, 
        { provide: 'EventUserService', useValue: mockEventUserService },
        { provide: 'EventClubService', useValue: mockEventClubService },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
