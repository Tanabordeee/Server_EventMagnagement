import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;

  const mockAdminRepository = {
    // Mock ฟังก์ชันที่ใช้ใน AdminService
    findOne: jest.fn(),
    save: jest.fn(),
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
});
