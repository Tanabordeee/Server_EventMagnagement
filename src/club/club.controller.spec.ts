import { Test, TestingModule } from '@nestjs/testing';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

describe('ClubController', () => {
  let controller: ClubController;

  // Mock ClubService
  const mockClubService = {
    findAll: jest.fn(() => ['club1', 'club2']),
    findOne: jest.fn(),
    Create: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubController],
      providers: [
        { provide: ClubService, useValue: mockClubService },
      ],
    }).compile();

    controller = module.get<ClubController>(ClubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new club', async () => {
      const createClubDto: CreateClubDto = {
        clubName: 'Test Club',
        email: 'test@club.com',
        password: 'password123',
        description: 'Test Club Description'
      };
      const expectedResult = { id: 1, ...createClubDto };
      mockClubService.Create.mockResolvedValue(expectedResult);

      const result = await controller.create(createClubDto);

      expect(result).toEqual(expectedResult);
      expect(mockClubService.Create).toHaveBeenCalledWith(createClubDto);
    });
  });

  describe('findOne', () => {
    it('should return club profile', async () => {
      const mockUser = { email: 'test@club.com' };
      const expectedClub = { id: 1, clubName: 'Test Club', email: 'test@club.com' };
      mockClubService.findByEmail.mockResolvedValue(expectedClub);

      const result = await controller.findOne({ user: mockUser });

      expect(result).toEqual(expectedClub);
      expect(mockClubService.findByEmail).toHaveBeenCalledWith(mockUser.email);
    });
  });

  describe('update', () => {
    it('should update club profile', async () => {
      const mockUser = { email: 'test@club.com' };
      const updateClubDto: UpdateClubDto = {
        clubName: 'Updated Club Name',
        description: 'Updated Description'
      };
      const expectedResult = { id: 1, email: 'test@club.com', ...updateClubDto };
      mockClubService.update.mockResolvedValue(expectedResult);

      const result = await controller.update({ user: mockUser }, updateClubDto);

      expect(result).toEqual(expectedResult);
      expect(mockClubService.update).toHaveBeenCalledWith(mockUser.email, updateClubDto);
    });
  });

  describe('remove', () => {
    it('should delete club', async () => {
      const mockUser = { email: 'test@club.com' };
      const expectedResult = { message: 'Club deleted successfully' };
      mockClubService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove({ user: mockUser });

      expect(result).toEqual(expectedResult);
      expect(mockClubService.remove).toHaveBeenCalledWith(mockUser.email);
    });
  });
});
