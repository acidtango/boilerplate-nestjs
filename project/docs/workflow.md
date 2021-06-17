# Project workflow

- [🛠 Local Setup](#-local-setup)
- [🩺 Health Check](#-health-check)
- [🔑 Environment Variables](#-environment-variables)
- [📊 Database](#-database)
- [📜 Swagger](#-swagger)
- [📘 Documentation](#-documentation)

## 🛠 Local Setup

To set up a local development environment, we'll only need to have [Docker](https://www.docker.com/) installed and use the `docker-compose.yml` file. Here are some useful commands:

```sh
# Build services.
docker-compose build

# Create and start containers.
docker-compose up

# Stop and remove started containers, remove unused volumes and start new containers.
docker-compose down && docker volume prune -f && docker-compose up --build

# Remove all unused containers, networks, images (both dangling and unreferenced) and volumes. 
docker system prune --all --volumes
```

### Prettier and ESLint

We are using `Prettier` for code formatting and `ESLint` as our code linter with the Airbnb's rules for TypeScript. Configure your editor so it formats your code automatically or use the following commands:

```sh
# Format the project code.
npm run format

#Run the linter.
npm run lint

# Fix linter errors automatically.
npm run lint:fix
```

### Pre-commit

Remember to always execute the following command before any commit to make sure that the format of your files are correct and that every test is passing:

```sh
npm run precommit
```

## 🩺 Health Check

The health endpoint `GET /health` should be maintained for monitoring and alerting purposes. This endpoint returns an OK response if the API is running correctly and lists the status of dependencies. For instance, the health endpoint may need to check that:
- database connection is established
- indispensable microservices are reachable
- external APIs are responding

## 🔑 Environment Variables

Our environment variables are set in the `.env` file, which is present in the `.gitignore` file so it is never pushed to the repositories, you'll need to ask for the credentials to other team members. 

There are two rules to consider when working with environment variables:
- They should not be used in the code directly. don't use the `process.env.ENV_VARIABLE` hack. Instead, use the configuration file: `src/app.config.ts`.
- Remember to update the `.env.example` file whenever you add or remove any environment variables so other developers can keep track of the required variables.

## 📊 Database

We are using [PostgreSQL](https://www.postgresql.org/) and [TypeORM](https://typeorm.io/) as our main database with [Data Mapper](https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md#what-is-the-data-mapper-pattern) patterns for connections.

### Migrations

Configuration file `database/ormconfig.ts` is configured to use TypeORM's [migrations](https://typeorm.io/#/migrations).

To generate a migration based on the entities modifications:

```sh
npm run migration:generate MigrationName
```

To generate an empty migration:

```sh
npm run migration:create MigrationName
```

To run the migrations:

```sh
npm run migration:run
```

To revert the last migration:

```sh
npm run migration:revert
```

### Seeds

We are also using seeds to populate the database automatically whenever the server is started with Docker. Script `database/seeders/seeder.ts` is executed to run the seeds after the migrations have finished.

The seeder script will check if the records are present in the database first, if they are, it won't insert them again, so you can run the script and restart the server as many times as you need.

To run the seeder script:

```sh
npm run seed
```

## 📜 Swagger


NestJS includes a Swagger module to programatically generate the API Swagger documentation following the [OpenApi Specification](https://swagger.io/specification/). For detailed usage instructions check the [NestJS documentation](https://docs.nestjs.com/recipes/swagger). We are using the plugin provided by NestJS to generate the documentation automatically with `nest-cli.json`.

There is a document builder and a `SwaggerModule` in file `main.ts`. The `SwaggerModule.setup()` method sets the documentation to endpoint `/docs`.

- To visit the live Swagger doc: [http://localhost:8080/docs](http://localhost:8080/docs).

- To download the Swagger documentation as a JSON file: [http://localhost:8080/docs-json](http://localhost:8080/docs-json)

## 📘 Documentation

The `docs` folder contains the project's documentation. Please remember to keep it updated and add new files to the README.md index.
