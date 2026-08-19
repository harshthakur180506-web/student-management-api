# Student Management API

A backend REST API built with **NestJS and TypeScript** for managing students within an educational institution.

The application provides a structured system for managing student records across five academic branches: **Computer Science, Electronics & Telecommunication (ENTC), Civil, Mechanical, and Artificial Intelligence & Data Science (AIDS)**.

The project includes **authentication, authorization, CRUD operations, pagination, advanced search and filtering, PostgreSQL database integration, RabbitMQ messaging, Swagger API documentation, and Docker support**.

---

## Features

* Student CRUD operations
* Five predefined academic branches
* Branch/Tenant-based student organization
* Authentication
* Authorization
* Role-based access control
* Pagination
* Advanced student search
* Student filtering
* PostgreSQL database integration
* TypeORM integration
* RabbitMQ integration
* Swagger API documentation
* Swagger-based API testing
* Docker support
* Environment-based configuration
* Input validation

---

## Academic Branches

The application currently supports five branches:

| Branch               | Description                                 |
| -------------------- | ------------------------------------------- |
| **Computer Science** | Computer Science Engineering                |
| **ENTC**             | Electronics & Telecommunication Engineering |
| **Civil**            | Civil Engineering                           |
| **Mechanical**       | Mechanical Engineering                      |
| **AIDS**             | Artificial Intelligence & Data Science      |

Each student belongs to one of these branches.

```text
College
│
├── Computer Science
│   ├── Student 1
│   └── Student 2
│
├── ENTC
│   ├── Student 3
│   └── Student 4
│
├── Civil
│   ├── Student 5
│   └── Student 6
│
├── Mechanical
│   ├── Student 7
│   └── Student 8
│
└── AIDS
    ├── Student 9
    └── Student 10
```

---

## Tech Stack

| Technology     | Purpose                       |
| -------------- | ----------------------------- |
| **NestJS**     | Backend framework             |
| **TypeScript** | Programming language          |
| **PostgreSQL** | Relational database           |
| **TypeORM**    | Database ORM                  |
| **RabbitMQ**   | Message broker                |
| **Swagger**    | API documentation and testing |
| **Docker**     | Containerization              |
| **npm**        | Package management            |

---

## Architecture Overview

The application follows a modular NestJS backend architecture.

```text
                    Client
                      │
                      ▼
              ┌───────────────┐
              │   NestJS API  │
              └───────┬───────┘
                      │
          ┌───────────┼───────────┐
          │           │           │
          ▼           ▼           ▼
   Authentication  Students   Branches/Tenants
          │           │           │
          │           ▼           │
          │    Search/Filtering   │
          │    & Pagination       │
          │           │           │
          └───────────┼───────────┘
                      │
             ┌────────┴────────┐
             ▼                 ▼
        PostgreSQL          RabbitMQ
        + TypeORM          Message Broker
```

---

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git
* PostgreSQL
* RabbitMQ
* Docker (optional)

---

# Getting Started

## 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd student-management-api
```

Replace `YOUR_REPOSITORY_URL` with the URL of this GitHub repository.

---

## 2. Install Dependencies

```bash
npm install
```

This installs all dependencies listed in `package.json`.

---

## 3. Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
DB_DATABASE=student_management_db
```

Replace `YOUR_POSTGRES_PASSWORD` with your PostgreSQL password.

If RabbitMQ configuration is required by your implementation, add the corresponding RabbitMQ environment variables used by the project.

> **Important:** Never commit the `.env` file to GitHub.

A `.env.example` file is included in the repository to show the required environment variables without exposing sensitive information.

---

# PostgreSQL Setup

The application uses **PostgreSQL** as its database and **TypeORM** for database interaction.

Create a database named:

```sql
CREATE DATABASE student_management_db;
```

Make sure PostgreSQL is running before starting the application.

The application is configured to automatically load entities and synchronize the database schema during development.

---

# RabbitMQ Setup

RabbitMQ is integrated into the project to provide **message-based communication and asynchronous processing**.

Make sure RabbitMQ is installed and running before starting the application.

RabbitMQ can be used for:

* Asynchronous processing
* Message-based communication
* Event-driven operations
* Decoupling application components
* Background processing
* Scalable message handling

Configure the RabbitMQ connection using the environment variables expected by the application.

---

# Authentication

The application includes authentication to verify the identity of users accessing protected resources.

Authentication ensures that only valid users can access protected API endpoints.

Protected endpoints require the appropriate authentication credentials.

---

# Authorization

Authorization is implemented to determine whether an authenticated user has permission to perform a particular operation.

The application supports role-based access control where applicable.

This provides an additional security layer after authentication.

```text
Authentication
      │
      ▼
"Who are you?"
      │
      ▼
Authorization
      │
      ▼
"What are you allowed to do?"
```

---

# Student Management

The API provides CRUD operations for managing student records.

The basic operations include:

| Method   | Endpoint        | Description         |
| -------- | --------------- | ------------------- |
| `GET`    | `/students`     | Get students        |
| `GET`    | `/students/:id` | Get a student by ID |
| `POST`   | `/students`     | Create a student    |
| `PATCH`  | `/students/:id` | Update a student    |
| `DELETE` | `/students/:id` | Delete a student    |

> Update these endpoints if your actual routes differ.

---

# Branch Management

Each student belongs to one of the five predefined branches:

* Computer Science
* ENTC
* Civil
* Mechanical
* AIDS

This allows student information to be organized according to their academic branch.

Branch-based filtering can also be used to retrieve students belonging to a particular branch.

---

# Pagination

The student listing functionality supports pagination to efficiently handle large amounts of student data.

Pagination allows the API to return a limited number of records per request.

Example:

```text
/students?page=1&limit=10
```

Where:

* `page` specifies the page number.
* `limit` specifies the number of students returned per page.

Pagination improves API performance and prevents unnecessarily large responses.

---

# Advanced Search

The API supports advanced student search functionality.

Students can be searched using supported student attributes.

Example:

```text
/students?search=John
```

The exact search parameters depend on the fields implemented in the application.

---

# Filtering

Student records can be filtered based on supported criteria such as branch and other student attributes.

Example:

```text
/students?branch=ENTC
```

Search, filtering, and pagination can be combined where supported.

Example:

```text
/students?branch=ENTC&search=John&page=1&limit=10
```

---

# Swagger API Documentation

The API is documented and tested using **Swagger**.

After starting the application, open the Swagger UI using the configured Swagger route.

For example:

```text
http://localhost:3000/api
```

Swagger provides an interactive interface for:

* Viewing API endpoints
* Viewing request schemas
* Viewing response schemas
* Testing API endpoints
* Testing authentication
* Testing CRUD operations
* Exploring query parameters
* Testing pagination
* Testing search and filtering

> Update the Swagger URL if your project uses a different route.

---

# Docker Support

The project supports Docker for containerized development and deployment.

If a `Dockerfile` is provided, build the application image using:

```bash
docker build -t student-management-api .
```

Run the container:

```bash
docker run -p 3000:3000 student-management-api
```

If Docker Compose is configured in the project, use:

```bash
docker compose up --build
```

Docker can be used to simplify the setup and deployment of the application and its supporting services.

---

# Running the Application

## Development

```bash
npm run start:dev
```

## Normal Start

```bash
npm run start
```

## Build

```bash
npm run build
```

## Production

```bash
npm run start:prod
```

## Tests

```bash
npm run test
```

---

# Environment Variables

The application uses environment variables for configuration.

| Variable      | Description              |
| ------------- | ------------------------ |
| `DB_HOST`     | PostgreSQL host          |
| `DB_PORT`     | PostgreSQL port          |
| `DB_USERNAME` | PostgreSQL username      |
| `DB_PASSWORD` | PostgreSQL password      |
| `DB_DATABASE` | PostgreSQL database name |

Add RabbitMQ variables to this table if they are configured through `.env` in the application.

---

# Project Structure

```text
student-management-api/
│
├── src/
│   ├── auth/
│   ├── students/
│   ├── tenants/
│   ├── ...
│
├── test/
│
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── nest-cli.json
├── tsconfig.json
└── README.md
```

Update the structure above to match the actual folders in the project.

---

# Security

Sensitive information must never be committed to GitHub.

Do not upload:

* `.env`
* Database passwords
* JWT secrets
* RabbitMQ credentials
* API keys
* Access tokens
* Private credentials

The `.env` file is excluded using `.gitignore`.

---

# Development Notes

The project uses environment variables to separate configuration from application code.

For local development:

```text
Application
     │
     ├── PostgreSQL
     │
     └── RabbitMQ
```

The application communicates with PostgreSQL for persistent student data and RabbitMQ for message-based operations.

---

# Future Improvements

Potential future improvements include:

* Automated unit and integration testing
* CI/CD pipeline
* Cloud deployment
* Monitoring and logging
* API rate limiting
* Database migrations for production
* Redis caching
* Enhanced event-driven architecture

---

# Author

**Harsh Thakur**

---

# License

This project is intended for educational and development purposes.
