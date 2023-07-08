## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
aws ssm put-parameter \
    --name "/dev/lambda-session-key" \
    --value "averylogphrasebiggerthanthirtytwochars" \
    --type SecureString
aws ssm put-parameter \
    --name "/dev/daily-record-table" \
    --value "dev.DailyRecord" \
    --type String
npm install
npx sls deploy
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
