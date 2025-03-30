import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

interface Admin {
  adminID: string;
  adminName: string;
  email: string;
  password?: string;
  events?: any[];
}

describe('AdminService', () => {
  let service: AdminService;

  const mockAdminRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
    create: jest.fn(),
  };

  const mockDataSource = {
    getRepository: jest.fn(() => mockAdminRepository),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        { provide: 'AdminRepository', useValue: mockAdminRepository },
        { provide: 'DataSource', useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new admin', async () => {
      const createAdminDto: CreateAdminDto = {
        adminName: 'Test Admin',
        email: 'admin@test.com',
        password: 'password123'
      };
      const mockAdmin: Admin = {
        adminID: '1',
        ...createAdminDto
      };
      
      mockAdminRepository.create.mockReturnValue(mockAdmin);
      mockAdminRepository.save.mockResolvedValue(mockAdmin);

      const result = await service.create(createAdminDto);

      expect(result).toEqual(mockAdmin);
      expect(mockAdminRepository.create).toHaveBeenCalledWith(createAdminDto);
      expect(mockAdminRepository.save).toHaveBeenCalledWith(mockAdmin);
    });
  });

  describe('findAll', () => {
    it('should return all admins with their events', async () => {
      const mockAdmins: Admin[] = [
        { adminID: '1', adminName: 'Admin 1', email: 'admin1@test.com', events: [] },
        { adminID: '2', adminName: 'Admin 2', email: 'admin2@test.com', events: [] }
      ];
      
      mockAdminRepository.find.mockResolvedValue(mockAdmins);

      const result = await service.findAll();

      expect(result).toEqual(mockAdmins);
      expect(mockAdminRepository.find).toHaveBeenCalledWith({ relations: ['events'] });
    });
  });

  describe('findOne', () => {
    it('should return admin by ID with events', async () => {
      const mockAdmin: Admin = {
        adminID: '1',
        adminName: 'Test Admin',
        email: 'admin@test.com',
        events: []
      };
      
      mockAdminRepository.findOne.mockResolvedValue(mockAdmin);

      const result = await service.findOne('1');

      expect(result).toEqual(mockAdmin);
      expect(mockAdminRepository.findOne).toHaveBeenCalledWith({
        where: { adminID: '1' },
        relations: ['events']
      });
    });

    it('should return null if admin not found', async () => {
      mockAdminRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne('999');

      expect(result).toBeNull();
    });
  });

  describe('Update', () => {
    it('should update admin profile', async () => {
      const mockAdmin: Admin = {
        adminID: '1',
        adminName: 'Test Admin',
        email: 'admin@test.com'
      };
      const updateAdminDto: UpdateAdminDto = {
        adminName: 'Updated Admin Name',
        email: 'updated@test.com'
      };
      const updatedAdmin = { ...mockAdmin, ...updateAdminDto };
      
      mockAdminRepository.findOne.mockResolvedValue(mockAdmin);
      mockAdminRepository.save.mockResolvedValue(updatedAdmin);

      const result = await service.Update('admin@test.com', updateAdminDto);

      expect(result).toEqual(updatedAdmin);
      expect(mockAdminRepository.findOne).toHaveBeenCalledWith({ where: { email: 'admin@test.com' } });
      expect(mockAdminRepository.save).toHaveBeenCalledWith(updatedAdmin);
    });

    it('should return null if admin not found', async () => {
      mockAdminRepository.findOne.mockResolvedValue(null);

      const result = await service.Update('nonexistent@test.com', {});

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return admin by email with events', async () => {
      const mockAdmin: Admin = {
        adminID: '1',
        adminName: 'Test Admin',
        email: 'admin@test.com',
        events: []
      };
      
      mockAdminRepository.findOne.mockResolvedValue(mockAdmin);

      const result = await service.findByEmail('admin@test.com');

      expect(result).toEqual(mockAdmin);
      expect(mockAdminRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'admin@test.com' },
        relations: ['events']
      });
    });

    it('should return null if admin not found', async () => {
      mockAdminRepository.findOne.mockResolvedValue(null);

      const result = await service.findByEmail('nonexistent@test.com');

      expect(result).toBeNull();
    });
  });

  describe('Delete', () => {
    it('should delete admin', async () => {
      const mockAdmin: Admin = {
        adminID: '1',
        adminName: 'Test Admin',
        email: 'admin@test.com'
      };
      
      mockAdminRepository.findOne.mockResolvedValue(mockAdmin);
      mockAdminRepository.remove.mockResolvedValue(mockAdmin);

      const result = await service.Delete('admin@test.com');

      expect(result).toEqual(mockAdmin);
      expect(mockAdminRepository.findOne).toHaveBeenCalledWith({ where: { email: 'admin@test.com' } });
      expect(mockAdminRepository.remove).toHaveBeenCalledWith(mockAdmin);
    });

    it('should return null if admin not found', async () => {
      mockAdminRepository.findOne.mockResolvedValue(null);

      const result = await service.Delete('nonexistent@test.com');

      expect(result).toBeNull();
    });
  });
});
