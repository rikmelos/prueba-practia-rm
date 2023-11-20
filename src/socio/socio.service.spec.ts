import { Test, TestingModule } from '@nestjs/testing';
import { SocioService } from './socio.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SocioEntity } from './socio.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('SocioService', () => {
  let service: SocioService;
  let repo: Repository<SocioEntity>;

  const mockSocioRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    preload: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocioService,
        {
          provide: getRepositoryToken(SocioEntity),
          useValue: mockSocioRepository,
        },
      ],
    }).compile();

    service = module.get<SocioService>(SocioService);
    repo = module.get<Repository<SocioEntity>>(getRepositoryToken(SocioEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new socio', async () => {
    const newSocioData = new SocioEntity();
    newSocioData.username = 'newUser';
    newSocioData.email = 'new@example.com';
    newSocioData.birthDate = new Date();

    mockSocioRepository.save.mockResolvedValue(newSocioData);

    expect(await service.create(newSocioData)).toEqual(newSocioData);
    expect(mockSocioRepository.save).toHaveBeenCalledWith(newSocioData);
  });

  it('should find all socios', async () => {
    mockSocioRepository.find.mockResolvedValue([]);
    expect(await service.findAll()).toEqual([]);
    expect(mockSocioRepository.find).toHaveBeenCalled();
  });

  it('should find a socio by id', async () => {
    const socio = new SocioEntity();
    socio.id = 1;
    mockSocioRepository.findOne.mockResolvedValue(socio);

    expect(await service.findOne(1)).toEqual(socio);
    expect(mockSocioRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should throw an error if socio not found', async () => {
    mockSocioRepository.findOne.mockResolvedValue(undefined);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should update a socio', async () => {
    const socio = new SocioEntity();
    socio.id = 1;
    socio.email = 'updated@example.com';

    mockSocioRepository.preload.mockResolvedValue(socio);
    mockSocioRepository.save.mockResolvedValue(socio);

    expect(await service.update(1, { email: 'updated@example.com' })).toEqual(
      socio,
    );
    expect(mockSocioRepository.preload).toHaveBeenCalledWith({
      id: 1,
      email: 'updated@example.com',
    });
    expect(mockSocioRepository.save).toHaveBeenCalledWith(socio);
  });

  it('should throw an error if socio to update not found', async () => {
    mockSocioRepository.preload.mockResolvedValue(undefined);

    await expect(
      service.update(1, { email: 'updated@example.com' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should delete a socio', async () => {
    mockSocioRepository.delete.mockResolvedValue({ affected: 1 });
    await service.delete('1');
    expect(mockSocioRepository.delete).toHaveBeenCalledWith('1');
  });
});
