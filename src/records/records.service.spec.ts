import { RecordsService } from './records.service';
import { RecordsRepository } from './records.repository';

describe('RecordsService', () => {
  let service: RecordsService;
  let repository: RecordsRepository;

  beforeEach(async () => {
    repository = jest.requireMock('./records.repository');
    service = new RecordsService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
