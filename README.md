# Kaburlu

## Technology Stack

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

[Postgres16](https://www.postgresql.org/) database.

[Drizzle Orm](https://orm.drizzle.team/) ORM. We are using this instead of typeorm for better typesafety, speed and lower bugs.


### Installation

```bash
$ pnpm install
```

### Running the app

```bash
# create .env file
$ cp .env.example .env
# add database url and a secret key

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

### Access APIs
Open following url [http://localhost:3000/api#/](http://localhost:3000/api#/) in browser to access swagger documentation.

### Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```