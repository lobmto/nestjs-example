import { RecordsRepository } from './records.repository';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

describe('RecordsRepository', () => {
  let dbClient: DynamoDBDocumentClient;
  let repository: RecordsRepository;

  beforeEach(async () => {
    dbClient = jest.requireMock('src/dynamo/dynamo.module');
    repository = new RecordsRepository(dbClient);
  });

  describe('findOne()', () => {
    it('should find a record by date', async () => {
      dbClient.send = jest
        .fn()
        .mockImplementation(async (command: GetCommand) => {
          expect(command.input.TableName).toBe('DailyRecord');
          expect(command.input.Key).toStrictEqual({ date: '2023-07-07' });
          return {
            Item: {
              records: [
                {
                  startAt: '12:00:00',
                },
              ],
              date: '2023-07-07',
            },
          };
        });

      const res = await repository.findOne('2023-07-07');
      expect(res).toStrictEqual({
        date: '2023-07-07',
        records: [
          {
            startAt: '12:00:00',
          },
        ],
      });
    });

    it('should return null when not existed date', async () => {
      dbClient.send = jest
        .fn()
        .mockImplementation(async (command: GetCommand) => {
          expect(command.input.TableName).toBe('DailyRecord');
          expect(command.input.Key).toStrictEqual({ date: '2023-07-07' });
          return {
            Item: undefined,
          };
        });

      const res = await repository.findOne('2023-07-07');
      expect(res).toBe(null);
    });
  });
});
