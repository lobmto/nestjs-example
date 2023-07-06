import { Test, TestingModule } from '@nestjs/testing';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';

describe('RecordsController', () => {
  let controller: RecordsController;
  let service: RecordsService;

  beforeEach(async () => {
    service = jest.requireMock('./records.service');
    controller = new RecordsController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
