import { Test, TestingModule } from '@nestjs/testing';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

interface Club {
  clubID: string;
  clubName: string;
  email: string;
  password?: string;
  events?: any[];
}

describe('ClubService', () => {
  let service: ClubService;

  const mockClubRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClubService,
        { provide: 'ClubRepository', useValue: mockClubRepository },
      ],
    }).compile();

    service = module.get<ClubService>(ClubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('should create a new club', async () => {
      const createClubDto: CreateClubDto = {
        clubName: 'Test Club',
        email: 'club@test.com',
        password: 'password123'
      };
      const mockClub: Club = {
        clubID: '1',
        ...createClubDto
      };
      
      mockClubRepository.create.mockReturnValue(mockClub);
      mockClubRepository.save.mockResolvedValue(mockClub);

      const result = await service.Create(createClubDto);

      expect(result).toEqual(mockClub);
      expect(mockClubRepository.create).toHaveBeenCalledWith(createClubDto);
      expect(mockClubRepository.save).toHaveBeenCalledWith(mockClub);
    });
  });

  describe('findAll', () => {
    it('should return all clubs with their events', async () => {
      const mockClubs: Club[] = [
        { clubID: '1', clubName: 'Club 1', email: 'club1@test.com', events: [] },
        { clubID: '2', clubName: 'Club 2', email: 'club2@test.com', events: [] }
      ];
      
      mockClubRepository.find.mockResolvedValue(mockClubs);

      const result = await service.findAll();

      expect(result).toEqual(mockClubs);
      expect(mockClubRepository.find).toHaveBeenCalledWith({ relations: ['events'] });
    });
  });

  describe('findOne', () => {
    it('should return club by ID with events', async () => {
      const mockClub: Club = {
        clubID: '1',
        clubName: 'Test Club',
        email: 'club@test.com',
        events: []
      };
      
      mockClubRepository.findOne.mockResolvedValue(mockClub);

      const result = await service.findOne('1');

      expect(result).toEqual(mockClub);
      expect(mockClubRepository.findOne).toHaveBeenCalledWith({
        where: { clubID: '1' },
        relations: ['events']
      });
    });

    it('should return null if club not found', async () => {
      mockClubRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne('999');

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return club by email with events', async () => {
      const mockClub: Club = {
        clubID: '1',
        clubName: 'Test Club',
        email: 'club@test.com',
        events: []
      };
      
      mockClubRepository.findOne.mockResolvedValue(mockClub);

      const result = await service.findByEmail('club@test.com');

      expect(result).toEqual(mockClub);
      expect(mockClubRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'club@test.com' },
        relations: ['events']
      });
    });

    it('should return null if club not found', async () => {
      mockClubRepository.findOne.mockResolvedValue(null);

      const result = await service.findByEmail('nonexistent@test.com');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update club profile', async () => {
      const mockClub: Club = {
        clubID: '1',
        clubName: 'Test Club',
        email: 'club@test.com'
      };
      const updateClubDto: UpdateClubDto = {
        clubName: 'Updated Club Name',
        email: 'updated@test.com'
      };
      const updatedClub = { ...mockClub, ...updateClubDto };
      
      mockClubRepository.findOne.mockResolvedValue(mockClub);
      mockClubRepository.save.mockResolvedValue(updatedClub);

      const result = await service.update('club@test.com', updateClubDto);

      expect(result).toEqual(updatedClub);
      expect(mockClubRepository.findOne).toHaveBeenCalledWith({ where: { email: 'club@test.com' } });
      expect(mockClubRepository.save).toHaveBeenCalledWith(updatedClub);
    });

    it('should return null if club not found', async () => {
      mockClubRepository.findOne.mockResolvedValue(null);

      const result = await service.update('nonexistent@test.com', {});

      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should delete club', async () => {
      const mockClub: Club = {
        clubID: '1',
        clubName: 'Test Club',
        email: 'club@test.com'
      };
      
      mockClubRepository.findOne.mockResolvedValue(mockClub);
      mockClubRepository.remove.mockResolvedValue(mockClub);

      const result = await service.remove('club@test.com');

      expect(result).toEqual(mockClub);
      expect(mockClubRepository.findOne).toHaveBeenCalledWith({ where: { email: 'club@test.com' } });
      expect(mockClubRepository.remove).toHaveBeenCalledWith(mockClub);
    });

    it('should return null if club not found', async () => {
      mockClubRepository.findOne.mockResolvedValue(null);

      const result = await service.remove('nonexistent@test.com');

      expect(result).toBeNull();
    });
  });
});
