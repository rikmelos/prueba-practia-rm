import { Test, TestingModule } from '@nestjs/testing';
import { SocioController } from './socio.controller';
import { SocioService } from './socio.service';
import { SocioEntity } from './socio.entity';

describe('SocioController', () => {
  let controller: SocioController;
  let service: SocioService;

  const mockSocio = {
    id: 1,
    username: 'usuario123',
    email: 'usuario@example.com',
    birthDate: new Date('1990-01-01'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocioController],
      providers: [
        {
          provide: SocioService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockSocio),
            findAll: jest.fn().mockResolvedValue([mockSocio]),
            findOne: jest.fn().mockResolvedValue(mockSocio),
            update: jest
              .fn()
              .mockResolvedValue({ ...mockSocio, username: 'UpdatedUser' }),
            delete: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    controller = module.get<SocioController>(SocioController);
    service = module.get<SocioService>(SocioService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a socio', async () => {
    expect(await controller.create(mockSocio)).toEqual(mockSocio);
    expect(service.create).toHaveBeenCalledWith(mockSocio);
  });

  it('should return an array of socios', async () => {
    expect(await controller.findAll()).toEqual([mockSocio]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single socio', async () => {
    expect(await controller.findOne('1')).toEqual(mockSocio);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a socio', async () => {
    const updatedSocio = { ...mockSocio, username: 'UpdatedUser' };
    expect(await controller.update('1', updatedSocio)).toEqual(updatedSocio);
    expect(service.update).toHaveBeenCalledWith(1, updatedSocio);
  });

  it('should delete a socio', async () => {
    await expect(controller.delete('1')).resolves.toEqual(null);
    expect(service.delete).toHaveBeenCalledWith('1');
  });
});
