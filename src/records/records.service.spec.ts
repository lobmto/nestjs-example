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

  describe('findDailyRecordByDate()', () => {
    it('returns all records by date', async () => {
      repository.findOne = jest.fn().mockImplementation((date: string) => {
        expect(date).toBe('2023-07-10');
        return {
          date: '2023-07-10',
          records: [
            {
              label: 'label',
              startedAt: '12:00:00',
            },
          ],
        };
      });
      const record = await service.findDailyRecordByDate('2023-07-10');
      expect(record).toStrictEqual({
        date: '2023-07-10',
        records: [
          {
            label: 'label',
            startedAt: '12:00:00',
          },
        ],
      });
    });

    it('returns null when record not found', async () => {
      repository.findOne = jest.fn().mockResolvedValue(null);
      const record = await service.findDailyRecordByDate('2023-07-10');
      expect(record).toBeNull();
    });
  });
});
