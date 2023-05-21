# Codetalk

![Docker Image](https://img.shields.io/badge/docker-latest-blue)
![Github Workflow](https://github.com/acidtango/boilerplate-nestjs/actions/workflows/main.yaml/badge.svg)

Codetalk is an example application that implements Domain-Driven Design (DDD) and Hexagonal Architecture.
It provides the ability to create talks, events, and speakers, and enables speakers to propose talks that can be reviewed
by event organizers and approved or rejected.

## 💻 I'm a dev, how do I get started?

Prerequisites:

- [Node.js](https://nodejs.org/es/download)
- [TypeScript](https://www.typescriptlang.org)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://docs.docker.com/get-docker/)

Now:

```bash
git clone git@github.com:DanielRamosAcosta/codetalk.git
cd codetalk
yarn install
docker-compose up -d database # starts DDBB
yarn start:dev # opens the server in development mode
```

You are now good ready to go!! 👯

### `yarn` scripts

- `build`: Compiles the project for later using `yarn start`
- `initialize:db`: Initializes a local database
- `start`: Opens the server by compiling the sources on the fly
- `start:dev`: Opens the server compiling the project on the fly in watch mode
- `start:prod`: Opens the server in production mode using the compiled sources
- `typecheck`: Checks the typing integrity of the project
- `lint:check`: Lints all the files
- `lint:fix`: Lints and fixes all the files

- `test`: Runs all the tests
- `test:unitary`: Runs unitary tests
- `test:integration`: Runs integration tests that uses local elements (local database, local event bus, etc...)
- `test:integration:third-party`: Runs integration tests that uses third party elements (stripe, email services, etc...)
- `test:e2e:memory`: Runs E2E tests using the in-memory repositories
- `test:e2e:db`: Runs E2E tests using the real database repositories
- `precommit`: Runs all the necessary commands that would make the CI pass

### Docker

We use Docker as a utility tool, mainly for running MongoDB. In the `docker-compose.yml` you have two wservuces services:

- `codetalk`: The API if you want to open it as a docker container
- `database`: A mongodb database that we use for starting the API in development mode and running the integration tests locally.

### Project management

- [Trello board](https://example.org/)
- [Github repo](https://github.com/DanielRamosAcosta/codetalk)
- [Github Actions](https://github.com/DanielRamosAcosta/codetalk/actions)
- [Figma](https://example.org/)
- [Firebase console](https://example.org/)

## 🛠 Which technologies are you using?

- Node
- [Nestjs](https://nestjs.com/)
    - Validations with [Class Validator & Class Transformer](https://docs.nestjs.com/techniques/validation)
    - [OpenAPI docs](https://docs.nestjs.com/openapi/introduction)
    - Mainly used as dependency injection container
- TypeScript
- [Stripe](https://stripe.com/es)

## 🏘 How is the code organized?

The architecture follows the principles from Hexagonal Architecture, and the final implementation is inspired by [this](https://github.com/CodelyTV/php-ddd-example) and [this](https://github.com/CodelyTV/typescript-ddd-skeleton) repositories from [CodelyTV](https://codely.tv/).

All the main code of the application lives under `src`

### `src`

Under this directory lives all the main application. This root directory contains all the modules of the app, and inside of each module you can find the classic division `domain/use-cases/infrastructure`.

- **Domain**: All the classes needed for modeling the business.
- **Use Cases** (AKA Application): These are specific use cases which orchestrates several domain elements to perform its job.
- **Infrastructure**: All the elements that are coupled to a certain Database/Library/Framework.

For example:

```
.
├── MainModule.ts
├── Token.ts
└── talks
   ├── TalksModule.ts
   ├── domain
   │  ├── errors
   │  │  ├── MaximumCospeakersReachedError.ts
   │  │  └── TalkTitleTooLongError.ts
   │  ├── Talk.ts
   │  └── TalkStatus.ts
   ├── use-cases
   │  ├── ApproveTalk.ts
   │  ├── ProposeTalk.ts
   │  └── GetTalk.ts
   │  └── controllers
   └── infrastructure
         ├── ApproveTalkEndpoint.ts
         ├── ProposeTalkEndpoint.ts
         ├── dtos
         │  ├── ProposeTalkRequestDTO.ts
         │  └── TalkResponseDTO.ts
         ├── GetTalkEndpoint.ts
         └── ReviewTalkEndpoint.ts
```

### 🕴 Dependency Injection, Dependency Inversion

Instead of depending on a certain implementation, we depend on an abstraction (an interface). This allows us to create a more decoupled architecture and facilitates testing.

It's the **D** from the [SOLID](https://en.wikipedia.org/wiki/SOLID) principles.

You can read more about dependency inversion [here](https://en.wikipedia.org/wiki/Dependency_inversion_principle).

- Do not import third-parties or side effect methods into the domain/use cases layer
- Instead, create an interface that represent that interaction
- Create two implementations of that interface:
    - A "real" implementation (calling TypeORM, Stripe, Fetch HTTP API Call...).
    - A "fake" implementation just for testing purposes.

### Dependency injection container

For wiring up all the dependencies, we are using the native Nestjs dependency container. This is the only thing that we are coupled to, specially from the application layer.

A special thing that we have to take into account, is when injecting interfaces.

The interfaces are a compile-time thing of Typescript, so when we need to inject a certain implementation we need to specify an identifier for that interface with a token.

```typescript
// TalkRepository.interface.ts
export interface TalkRepository {
    save(talk: Talk): Promise<void>
    findBy(talkId: TalkId): Promise<Talk | undefined>
}
```

```typescript
// Token.ts
export enum Token {
    TALK_REPOSITORY = 'TALK_REPOSITORY',
    // ...
}
```

Then we need to specify the dependency in the class consuming this interface

```typescript
class PurposeTalk {
  constructor(@Inject(Token.TALK_REPOSITORY) private readonly talkRepository: TalkRepository) {}
}
```

Later on, we need to wire up these dependencies from a Nestjs module:

```typescript
// TalkRepositoryModule.ts

@Global()
@Module({
    providers: [{ provide: Token.TALK_REPOSITORY, useClass: TalkRepositoryMongo }],
    exports: [Token.TALK_REPOSITORY],
})
export class TalkRepositoryModule {}
```

### Inheritance for specification

We are using Inheritance for specifying which element of Hexagonal Architecture is each class.

For example, we are extending a `ValueObject` class when having a value object or a `UseCase` for the use cases.

In general, this inheritance does not have any logic. It's just like a explanatory variable.

Examples:

```typescript
class ReservationLister extends UseCase { /* ... */}
class Reservation extends AggregateRoot { /* ... */ }
class ReservationTitle extends ValueObject<string> { /* ... */ }
```

## ✅ Tests

- We are using [Jest](https://jestjs.io/) and [tepper](https://github.com/DanielRamosAcosta/tepper) for acceptance tests.
- Unitary Tests are paired with the element that tests. For example `Talk.spec.ts` is next to `Talk.ts`.
- Acceptance tests lives under the `tests` directory. These tests crosses the framework layers and we interact with the API as a black box. These are the main tests that we use for TDD by performing outside-in.

### CI/CD

- The CI and CD are in Github Actions
- We run the precommit script before each commit using Husky.
- The CI runs for both acceptance/unitary and integration tests with a real database.
- After all tests passed, then the API is re-deployed

## 📲 Contact

The project was mainly developed by [Alberto González](https://github.com/AlberTJ97) and [Daniel Ramos](https://github.com/DanielRamosAcosta) from [Acid Tango](https://acidtango.com/) with ❤️ and 💪