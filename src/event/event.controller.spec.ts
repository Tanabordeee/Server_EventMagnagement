import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventUserService } from './EventUser.service';
import { EventClubService } from './EventClub.service'; 
import { EventAdminService } from './EventAdmin.service'; 

describe('EventController', () => {
  let controller: EventController;

  // Mock dependencies
  const mockEventService = {
    getAllEvents: jest.fn().mockResolvedValue([]), 
  };

  const mockEventUserService = {
    getUserEvents: jest.fn().mockResolvedValue([]),
  };

  const mockEventClubService = {
    getClubEvents: jest.fn().mockResolvedValue([]), 
  };

  const mockEventAdminService = {
    getAdminEvents: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        { provide: EventService, useValue: mockEventService },
        { provide: EventUserService, useValue: mockEventUserService },
        { provide: EventClubService, useValue: mockEventClubService },
        { provide: EventAdminService, useValue: mockEventAdminService },
      ],
    }).compile();

    controller = module.get<EventController>(EventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
