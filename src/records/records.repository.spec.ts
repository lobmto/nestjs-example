import { RecordsRepository } from './records.repository';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

describe('RecordsRepository', () => {
  let dbClient: DynamoDBDocumentClient;
  let repository: RecordsRepository;

  beforeEach(async () => {
    dbClient = jest.requireMock('src/dynamo/dynamo.module');
    repository = new RecordsRepository(dbClient);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findOne()', () => {
    it('should find a record by id', async () => {
      dbClient.send = jest
        .fn()
        .mockImplementation(async (command: GetCommand) => {
          expect(command.input.TableName).toBe('test');
          expect(command.input.Key).toStrictEqual({ id: '1234' });
          return {
            Item: {
              message: 'This is test',
              id: '1234',
            },
          };
        });

      const res = await repository.findOne('1234');
      expect(res).toStrictEqual({
        id: '1234',
        message: 'This is test',
      });
    });

    it('should return null when not existed id', async () => {
      dbClient.send = jest
        .fn()
        .mockImplementation(async (command: GetCommand) => {
          expect(command.input.TableName).toBe('test');
          expect(command.input.Key).toStrictEqual({ id: '1234' });
          return {
            Item: undefined,
          };
        });

      const res = await repository.findOne('1234');
      expect(res).toBe(null);
    });
  });
});
