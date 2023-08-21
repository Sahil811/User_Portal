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
├─ test
│  ├─ user.controller.test.ts
│  │
└─ tsconfig.json
```

- No duplicate file name in the whole application. Every file need to have a suffix to explain its type

  > Why? It's easier to search for a file and reduce the confusion of same file names

- Organize your files around product features, not roles. Also, place your test files next to their implementation. [Details](#why-feature-oriented-architecture)
  > Why? Instead of a long list of files, you will create small modules that encapsulate one responsibility including its test and so on. It gets much easier to navigate through and things can be found at a glance.

### Topic cover in this Project

- Setup Node.js with Express, PostgreSQL, Redis, and TypeORM
  - Creating PostgreSQL and Redis Database with Docker
  - Setup Environment Variables with Dotenv
- Initialize a New TypeORM Express App
- Connecting an Express application with PostgreSQL
- Connecting an ExpressJs application to Redis
- Run the Express Server
- List the Node.js API Routes
- User Login and Register Flow with JWT Authentication
- Defining Base and User Entities with TypeORM
- Defining Zod Schemas to Validate Request Body
- Create Middleware to Parse Zod Schema
- Password Management with Bcrypt
- Create Services to Interact with the Database
- Asymmetric Encryption (RS256 algorithm) Json Web Tokens
- Service to Sign Access and Refresh Tokens
- Error Handling in Express
- Create Authentication Route Controllers
- Create User Route Controller
- Create Authentication Middleware Guard
- Create the API Routes
  - Authentication Routes
  - User Routes
- Add the Routes to the Express Middleware Stack
- Run Database Migrations with TypeORM
- Create a Utility Class to Send Emails
  - Require the Nodemailer Credentials
  - Define the Email Class Attributes
  - Create a Nodemailer Transporter
  - Create a Method to Generate the Email Templates
  - Create a Method to Send the Emails
- Creating the Email Templates with Pug
- Create the User Entity with TypeORM
- Database Schema Migration with TypeORM
- Update the User Register Controller
- Add a Controller to Verify the Email
- Model Data with TypeORM and PostgreSQL
- Create Validation Schemas with Zod
- Create Services to Communicate with Database
- Add the Routes to the Express Middleware Pipeline
- Run Database Migration with TypeORM

## Available Scripts

```bash
test: Runs Jest, the testing framework, to execute the tests and provide test coverage information.

build: Invokes the TypeScript compiler (tsc) to compile TypeScript source files into JavaScript files. This is useful for generating the output that can be executed by Node.js.

start: Executes the compiled server code using ts-node. It starts the Node.js server by running the server.js file located in the build/src directory.

dev: Utilizes nodemon to run the server in development mode. This script monitors for changes in the codebase and automatically restarts the server when changes are detected.

migrate: A custom script that performs the following actions:
1. Removes the existing build directory to clean the previous build artifacts.
2. Invokes the build script to compile the TypeScript code.
3. Calls the typeorm migration:generate command to generate a migration based on a specified file and data source.

db:push: Similar to the migrate script, this custom script:
1. Removes the existing build directory.
2. Invokes the build script to compile the TypeScript code.
3. Executes the typeorm migration:run command to apply migrations to the database using a specified data source.
```

## API Documentation

```bash
Welcome to the documentation for the Node.js API endpoints provided by this application. This API allows you to manage user registration, login, user details retrieval, user listing, and user deletion. Please make sure to follow the guidelines provided below for each API endpoint.

Base URL: http://localhost:8000/api/


Register User

Endpoint: /users/register
Method: POST
Description: Register a new user with the specified details.
Request Body:
{
    "name": "sahil siddiqui",
    "password": "12345678",
    "passwordConfirm": "12345678",
    "email": "sahil@gmail.com",
    "role": "admin"
}


Verify Email
Endpoint: /verifyemail/:verificationCode
Method: GET
Description: This endpoint allows users to verify their email address by providing a verification code.


User Login

Endpoint: /users/login
Method: POST
Description: Log in a user with their email and password.
Request Body:
{
    "password": "12345678",
    "email": "sahil@gmail.com"
}


Get User Details

Endpoint: /users/details
Method: GET
Description: Retrieve details of the currently logged-in user.
Authentication: The request must include the authentication token or session key obtained after login.
Response: The response will contain detailed information about the currently logged-in user.


List Users (Admin Only)

Endpoint: /users/list
Method: GET
Description: Retrieve a list of users. This endpoint is accessible only to users with the "admin" role.
Authentication: The request must include the authentication token or session key obtained after login, and the logged-in user must have the "admin" role.
Response: The response will contain a list of user objects, each containing user details.


Delete User (Admin Only)

Endpoint: /users/delete
Method: POST
Description: Delete a user by providing their user reference.
Request Body:
{
    "userRef": "d75cba4f-c007-41d1-b48a-3308ea9a548f"
}
Authentication: The request must include the authentication token or session key obtained after login, and the logged-in user must have the "admin" role.
Response: A success message indicating that the user has been deleted.


Note: This API is built using Node.js. Proper authentication and authorization mechanisms are in place to ensure the security of the endpoints. Always include the authentication token or session key in your requests where required. If you encounter any issues or have questions, please contact the API administrator.
```

### About Me

[Sahil_Resume](https://drive.google.com/file/d/1o6V1oLOT9RHnDAsb9dxn-w8XGeXAKdtO/view)  
[Website](https://sahil811.github.io/portfolio-v2/)
