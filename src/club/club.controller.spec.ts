import { Test, TestingModule } from '@nestjs/testing';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

describe('ClubController', () => {
  let controller: ClubController;
  let service: ClubService;

  const mockClub = {
    id: 1,
    name: 'Club Name',
    foundationDate: new Date('2023-01-01'),
    image: 'image_url',
    description: 'Club Description',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubController],
      providers: [
        {
          provide: ClubService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockClub),
            findAll: jest.fn().mockResolvedValue([mockClub]),
            findOne: jest.fn().mockResolvedValue(mockClub),
            update: jest.fn().mockResolvedValue(mockClub),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    controller = module.get<ClubController>(ClubController);
    service = module.get<ClubService>(ClubService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new club', async () => {
    const createClubDto: CreateClubDto = {
      name: 'Club Name',
      foundationDate: '2023-01-01',
      image: 'image_url',
      description: 'Club Description',
    };

    expect(await controller.create(createClubDto)).toEqual(mockClub);
    expect(service.create).toHaveBeenCalledWith(createClubDto);
  });

  it('should return all clubs', async () => {
    expect(await controller.findAll()).toEqual([mockClub]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find a club by id', async () => {
    expect(await controller.findOne('1')).toEqual(mockClub);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a club', async () => {
    const updateClubDto: UpdateClubDto = {
      name: 'Updated Club Name',
      foundationDate: '2023-01-02',
      image: 'updated_image_url',
      description: 'Updated Club Description',
    };

    expect(await controller.update('1', updateClubDto)).toEqual(mockClub);
    expect(service.update).toHaveBeenCalledWith(1, updateClubDto);
  });

  it('should delete a club', async () => {
    expect(await controller.delete('1')).toEqual({ affected: 1 });
    expect(service.delete).toHaveBeenCalledWith(1);
  });
});
