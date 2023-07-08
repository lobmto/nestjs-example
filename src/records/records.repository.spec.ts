import { RecordsRepository } from './records.repository';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';

describe('RecordsRepository', () => {
  let dbClient: DynamoDBDocumentClient;
  let repository: RecordsRepository;

  beforeEach(async () => {
    dbClient = jest.requireMock('src/dynamo/dynamo.module');
    repository = new RecordsRepository(dbClient, 'dev.DailyRecord');
  });

  describe('findOne()', () => {
    it('should find a record by date', async () => {
      dbClient.send = jest
        .fn()
        .mockImplementation(async (command: GetCommand) => {
          expect(command.input.TableName).toBe('dev.DailyRecord');
          expect(command.input.Key).toStrictEqual({ date: '2023-07-07' });
          return {
            Item: {
              records: [
                {
                  label: 'sample',
                  startedAt: '12:00:00',
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
            label: 'sample',
            startedAt: '12:00:00',
          },
        ],
      });
    });

    it('should return null when not existed date', async () => {
      dbClient.send = jest
        .fn()
        .mockImplementation(async (command: GetCommand) => {
          expect(command.input.TableName).toBe('dev.DailyRecord');
          expect(command.input.Key).toStrictEqual({ date: '2023-07-07' });
          return {
            Item: undefined,
          };
        });

      const res = await repository.findOne('2023-07-07');
      expect(res).toBe(null);
    });
  });

  describe('insertOne()', () => {
    it('should insert a record with current time', async () => {
      dbClient.send = jest
        .fn()
        .mockImplementation(async (command: GetCommand | PutCommand) => {
          if (command instanceof GetCommand) {
            expect(command.input.TableName).toBe('dev.DailyRecord');
            expect(command.input.Key).toStrictEqual({ date: '2023-07-07' });
            return {
              Item: {
                records: [
                  {
                    label: 'sample',
                    startedAt: '12:00:00',
                  },
                ],
                date: '2023-07-07',
              },
            };
          } else if (command instanceof PutCommand) {
            expect(command.input.TableName).toBe('dev.DailyRecord');
            expect(command.input.Item?.date).toStrictEqual('2023-07-07');
          }
        });

      const res = await repository.insertOne('2023-07-07', {
        label: 'sample',
        startedAt: '13:00:00',
      });
      expect(res).toStrictEqual({
        date: '2023-07-07',
        records: [
          {
            label: 'sample',
            startedAt: '12:00:00',
          },
          {
            label: 'sample',
            startedAt: '13:00:00',
          },
        ],
      });
    });

    it('should return null when not existed date', async () => {
      dbClient.send = jest
        .fn()
        .mockImplementation(async (command: GetCommand | PutCommand) => {
          if (command instanceof GetCommand) {
            expect(command.input.TableName).toBe('dev.DailyRecord');
            expect(command.input.Key).toStrictEqual({ date: '2023-07-07' });
            return {
              Item: undefined,
            };
          } else if (command instanceof PutCommand) {
            expect(command.input.TableName).toBe('dev.DailyRecord');
            expect(command.input.Item?.date).toStrictEqual('2023-07-07');
          }
        });

      const res = await repository.insertOne('2023-07-07', {
        label: 'sample',
        startedAt: '12:00:00',
      });
      expect(res).toStrictEqual({
        date: '2023-07-07',
        records: [
          {
            label: 'sample',
            startedAt: '12:00:00',
          },
        ],
      });
    });
  });
});
