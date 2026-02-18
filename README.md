# E-Wallet RESTful API

E-wallet management system built with TypeScript, Express, and PostgreSQL.

## Tech Stack

- **Runtime:** Node.js v22.22.0 (LTS)
- **Language:** TypeScript 5.9.3
- **Framework:** Express 4.21.2
- **Database:** PostgreSQL 16 (Docker)
- **ORM:** Prisma 7.4.0
- **Validation:** Zod 4.3.6
- **Testing:** Jest 30.2.0
- **Security:** bcrypt 6.0.0
- **Logging:** Winston 3.19.0

## Features

- User authentication (register, login, logout)
- Contact management with pagination
- Address management with nested contacts
- JWT token-based authentication
- Comprehensive test coverage

## Project Structure

```
ewallet/
├── src/
│   ├── application/      # Core infrastructure (database, logging, web)
│   ├── controller/       # Request handlers
│   ├── model/           # Data models
│   ├── route/           # API routes
│   ├── service/         # Business logic
│   ├── validation/      # Request validation with Zod
│   ├── middleware/      # Express middleware
│   ├── error/           # Error handlers
│   └── type/            # TypeScript types
├── prisma/              # Database schema and migrations
├── test/                # Test files
└── doc/                 # API documentation
```

## Prerequisites

- Docker & Docker Compose
- Node.js & npm

## Installation

```shell
# 1. Start PostgreSQL with Docker Compose
docker compose up -d

# 2. Install dependencies
npm install

# 3. Generate Prisma Client
npx prisma generate

# 4. Build TypeScript
npm run build

# 5. Start application
npm run start
```

## Database Configuration

The project uses PostgreSQL with Docker Compose. Database configuration is centralized in `.env`:

- **Database Name:** `ewallet_test_tlab`
- **User:** `ewallet_user`
- **Password:** `ewallet_password`
- **Port:** `5433`

## Running Tests

```shell
npm test
```

## Docker Commands

```shell
# Start PostgreSQL container
docker compose up -d

# View container logs
docker compose logs postgres

# Stop containers
docker compose down

# Stop and remove volumes
docker compose down -v
```

## Environment Variables

All configuration is centralized in `.env` file, including:
- PostgreSQL connection settings
- Docker Compose configuration
- Prisma connection string

## API Documentation

API specifications are available in the `doc/` directory:
- [User API Spec](doc/user.md)
- [Contact API Spec](doc/contact.md)
- [Address API Spec](doc/address.md)

## License

ISC
