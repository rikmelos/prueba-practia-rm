import { Test, TestingModule } from '@nestjs/testing';
import { ClubSocioController } from './club-socio.controller';
import { ClubSocioService } from './club-socio.service';
import { Club } from '../club/club.entity';
import { SocioEntity } from '../socio/socio.entity';

describe('ClubSocioController', () => {
  let controller: ClubSocioController;
  let service: jest.Mocked<ClubSocioService>;

  beforeEach(async () => {
    service = {
      addMemberToClub: jest.fn(),
      findMembersFromClub: jest.fn(),
      findMemberFromClub: jest.fn(),
      updateMembersFromClub: jest.fn(),
      deleteMemberFromClub: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubSocioController],
      providers: [
        {
          provide: ClubSocioService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<ClubSocioController>(ClubSocioController);
  });

  it('should call service to add a member to a club', async () => {
    await controller.addMemberToClub('1', '1');
    expect(service.addMemberToClub).toHaveBeenCalledWith(1, 1);
  });

  it('should call service to find members from a club', async () => {
    service.findMembersFromClub.mockResolvedValue([new SocioEntity()]);
    const result = await controller.findMembersFromClub('1');
    expect(service.findMembersFromClub).toHaveBeenCalledWith(1);
    expect(result).toHaveLength(1);
  });

  it('should call service to find a member from a club', async () => {
    service.findMemberFromClub.mockResolvedValue(new SocioEntity());
    const result = await controller.findMemberFromClub('1', '1');
    expect(service.findMemberFromClub).toHaveBeenCalledWith(1, 1);
    expect(result).toBeDefined();
  });

  it('should call service to update members of a club', async () => {
    await controller.updateMembersFromClub('1', [1]);
    expect(service.updateMembersFromClub).toHaveBeenCalledWith(1, [1]);
  });

  it('should call service to delete a member from a club', async () => {
    await controller.deleteMemberFromClub('1', '1');
    expect(service.deleteMemberFromClub).toHaveBeenCalledWith(1, 1);
  });
});
