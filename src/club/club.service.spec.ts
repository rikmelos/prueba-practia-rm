import { Test, TestingModule } from '@nestjs/testing';
import { ClubService } from './club.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Club } from './club.entity';
import { Repository } from 'typeorm';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

describe('ClubService', () => {
  let service: ClubService;
  let repo: Repository<Club>;

  const mockClub = {
    id: 1,
    name: 'Club Name',
    foundationDate: '2023-01-01',
    image: 'image_url',
    description: 'Club Description',
  };

  const mockClubRepository = {
    find: jest.fn().mockResolvedValue([mockClub]),
    findOne: jest.fn().mockResolvedValue(mockClub),
    create: jest.fn().mockReturnValue(mockClub),
    save: jest.fn().mockResolvedValue(mockClub),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClubService,
        {
          provide: getRepositoryToken(Club),
          useValue: mockClubRepository,
        },
      ],
    }).compile();

    service = module.get<ClubService>(ClubService);
    repo = module.get<Repository<Club>>(getRepositoryToken(Club));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new club', async () => {
    const createClubDto: CreateClubDto = {
      name: 'Club Name',
      foundationDate: '2023-01-01',
      image: 'image_url',
      description: 'Club Description',
    };

    mockClubRepository.save.mockResolvedValue(mockClub);

    const result = await service.create(createClubDto);
    expect(result).toEqual(mockClub);
    expect(mockClubRepository.save).toHaveBeenCalledWith(expect.any(Club));
  });

  it('should return all clubs', async () => {
    expect(await service.findAll()).toEqual([mockClub]);
    expect(mockClubRepository.find).toHaveBeenCalled();
  });

  it('should return a single club', async () => {
    expect(await service.findOne(1)).toEqual(mockClub);
    expect(mockClubRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update a club', async () => {
    const updateClubDto: UpdateClubDto = {
      name: 'Updated Club Name',
      foundationDate: '2023-01-02',
      image: 'updated_image_url',
      description: 'Updated Club Description',
    };

    mockClubRepository.findOne.mockResolvedValue(mockClub);
    mockClubRepository.save.mockResolvedValue({
      ...mockClub,
      ...updateClubDto,
    });

    const result = await service.update(1, updateClubDto);
    expect(result).toEqual({ ...mockClub, ...updateClubDto });
    expect(mockClubRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(mockClubRepository.save).toHaveBeenCalledWith({
      ...mockClub,
      ...updateClubDto,
    });
  });

  it('should delete a club', async () => {
    await service.delete(1);
    expect(mockClubRepository.delete).toHaveBeenCalledWith(1);
  });
});
