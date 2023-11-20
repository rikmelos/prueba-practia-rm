import { Test, TestingModule } from '@nestjs/testing';
import { ClubSocioService } from './club-socio.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Club } from '../club/club.entity';
import { SocioEntity } from '../socio/socio.entity';
import { Repository } from 'typeorm';

describe('ClubSocioService', () => {
  let service: ClubSocioService;
  let mockClubRepository: jest.Mocked<Repository<Club>>;
  let mockSocioRepository: jest.Mocked<Repository<SocioEntity>>;

  beforeEach(async () => {
    mockClubRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as any;

    mockSocioRepository = {
      findOne: jest.fn(),
      findByIds: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClubSocioService,
        {
          provide: getRepositoryToken(Club),
          useValue: mockClubRepository,
        },
        {
          provide: getRepositoryToken(SocioEntity),
          useValue: mockSocioRepository,
        },
      ],
    }).compile();

    service = module.get<ClubSocioService>(ClubSocioService);
  });

  it('should add a member to a club', async () => {
    const club = new Club();
    club.socios = [];
    mockClubRepository.findOne.mockResolvedValue(club);
    mockSocioRepository.findOne.mockResolvedValue(new SocioEntity());

    await service.addMemberToClub(1, 1);
    expect(mockClubRepository.save).toHaveBeenCalled();
  });

  it('should find members from a club', async () => {
    const club = new Club();
    club.socios = [new SocioEntity()];
    mockClubRepository.findOne.mockResolvedValue(club);

    const result = await service.findMembersFromClub(1);
    expect(result).toHaveLength(1);
  });

  it('should find a member from a club', async () => {
    const club = new Club();
    club.socios = [new SocioEntity()];
    club.socios[0].id = 1;
    mockClubRepository.findOne.mockResolvedValue(club);

    const result = await service.findMemberFromClub(1, 1);
    expect(result).toBeDefined();
  });

  it('should update members of a club', async () => {
    const club = new Club();
    club.socios = [new SocioEntity()];
    mockClubRepository.findOne.mockResolvedValue(club);
    mockSocioRepository.findByIds.mockResolvedValue([new SocioEntity()]);

    await service.updateMembersFromClub(1, [1]);
    expect(mockClubRepository.save).toHaveBeenCalled();
  });

  it('should delete a member from a club', async () => {
    const club = new Club();
    club.socios = [new SocioEntity()];
    club.socios[0].id = 1;
    mockClubRepository.findOne.mockResolvedValue(club);

    await service.deleteMemberFromClub(1, 1);
    expect(mockClubRepository.save).toHaveBeenCalled();
  });
});
