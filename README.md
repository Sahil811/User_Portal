# User Portal

This repository contains a RESTful API built with Node.js, TypeScript, and PostgreSQL, designed to handle CRUD operations for a single resource - User. The API is secured using JWT authentication and is well-documented for easy setup and testing.

## Table of Contents

- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
- [Tech_Stack](#Tech_Stack)
- [Core_ideology](#Core_ideology)
- [Code_structure](#Code_structure)

## Requirements

- Node.js (v18.17.1 recommended)
- Docker (for PostgreSQL and Redis containers)
- PostgreSQL (already set up, schema and tables created)
- Redis (used for caching)
- JWT Access and Refresh Token private and public keys
- Ethereal email account (for sending emails)

## Setup

### Setup Env config

1. Create a .env file based on the provided .env template.

```bash
PORT=8000
NODE_ENV=development
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=6500
POSTGRES_USER=postgres
POSTGRES_PASSWORD=12345
POSTGRES_DB=node_typeorm
EMAIL_USER=ypi5eci55z2an5pm@ethereal.email
EMAIL_PASS=5B2N9Pn1ETvmXxDCye
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
JWT_ACCESS_TOKEN_PRIVATE_KEY=Private_path_of_pem_file
JWT_ACCESS_TOKEN_PUBLIC_KEY=public_path_of_pem_file
JWT_REFRESH_TOKEN_PRIVATE_KEY=private_path_of_pem_file
JWT_REFRESH_TOKEN_PUBLIC_KEY=public_path_of_pem_file
```

# Setup Dev Codebase (Considering Env config completed)

2. Installing dependencies

```bash
> Go to project directory
> npm install
```

3. Start the PostgreSQL and Redis containers:

```bash
    docker-compose up -d
```

4. Development mode

```bash
> npm run dev
> Go to http://localhost:8000
```

# Setup Prod

Same as dev

```bash
> Go to project directory
> npm install
> npm run start
> npm run build
> Go to http://localhost:8000
```

## Usage

1. Start the API in development mode:
   npm run dev

2. API is accessible at: http://localhost:8000

## Tech_Stack

### Application Blueprint

The backend data handling API is built using a robust tech stack that ensures scalability, maintainability, and security. Here's an overview of the technologies and libraries used:

- Node.js: The core of the application, providing a runtime environment for executing JavaScript code on the server-side.
- TypeScript: A statically typed superset of JavaScript that adds robust type checking, making the codebase more reliable and easier to maintain.
- Express.js: A fast, minimal, and flexible web application framework for Node.js, used to handle routing, middleware, and API endpoints.
- PostgreSQL: A powerful open-source relational database management system, used to store and manage structured data efficiently.
- Redis: An in-memory data store used for caching and improving the performance of frequently accessed data.
- TypeORM: An Object-Relational Mapping (ORM) library that simplifies database interactions by abstracting away SQL queries and providing a more intuitive approach to working with databases.
- JWT Authentication: JSON Web Token-based authentication is implemented to secure the API endpoints, ensuring that only authorized users can access protected resources.
- Docker: Used to containerize the application's dependencies, including PostgreSQL and Redis, ensuring consistent and reproducible development environments.
- Dotenv: A library for loading environment variables from a .env file, allowing for easy configuration of sensitive information like API keys and database credentials.
- Eslint: A tool for identifying and fixing code quality and style issues, ensuring consistent and readable code throughout the project.
- Jest: A JavaScript testing framework used to write unit and integration tests, ensuring the reliability of the application's functionality.
- Husky: A tool that helps enforce best practices by running scripts before committing code, such as linting and testing, preventing potentially problematic code from being committed.
- Prettier: A code formatting tool that ensures consistent code styling across the project, enhancing code readability and maintainability.

This tech stack was carefully chosen to provide a solid foundation for building a secure, performant, and maintainable backend data handling API. Each technology complements the others, contributing to the overall success of the project.

### Core_ideology

WRITE SMALL, REUSABLE AND COMPOSABLE FUNCTIONS

### Code structure

```
user_portal
├─ .env
├─ .eslintrc.json
├─ .gitignore
├─ .husky
│  └─ _
│     ├─ .gitignore
│     └─ husky.sh
├─ .prettierrc
├─ config
│  ├─ custom-environment-variables.ts
│  └─ default.ts
├─ dist
│  └─ index.js
├─ docker-compose.yml
├─ jest.config.js
├─ nodemon.json
├─ package-lock.json
├─ package.json
├─ private_key.pem
├─ public_key.pem
├─ README.md
├─ src
│  ├─ controllers
│  │  ├─ auth.controller.ts
│  │  └─ user.controller.ts
│  ├─ entities
│  │  ├─ model.entity.ts
│  │  └─ user.entity.ts
│  ├─ middleware
│  │  ├─ adminMiddleware.ts
│  │  ├─ deserializeUser.ts
│  │  ├─ requireUser.ts
│  │  └─ validate.ts
│  ├─ migrations
│  │  └─ 1692081383694-added-user-entity.ts
│  ├─ routes
│  │  └─ user.routes.ts
│  ├─ schemas
│  │  └─ user.schema.ts
│  ├─ server.ts
│  ├─ services
│  │  └─ user.service.ts
│  ├─ utils
│  │  ├─ appError.ts
│  │  ├─ connectRedis.ts
│  │  ├─ data-source.ts
│  │  ├─ email.ts
│  │  ├─ jwt.ts
│  │  └─ validateEnv.ts
│  └─ views
│     ├─ base.pug
│     ├─ resetPassword.pug
│     ├─ verificationCode.pug
│     └─ _styles.pug
└─ tsconfig.json
```

- No duplicate file name in the whole application. Every file need to have a suffix to explain its type

  > Why? It's easier to search for a file and reduce the confusion of same file names

- Organize your files around product features, not roles. Also, place your test files next to their implementation. [Details](#why-feature-oriented-architecture)
  > Why? Instead of a long list of files, you will create small modules that encapsulate one responsibility including its test and so on. It gets much easier to navigate through and things can be found at a glance.

### About Me

[Sahil_Resume](https://drive.google.com/file/d/1o6V1oLOT9RHnDAsb9dxn-w8XGeXAKdtO/view)  
[Website](https://sahil811.github.io/portfolio-v2/)
