# Technical Test: Game Event Ingesting

## Overview

Develop a self-contained system to ingest events from a hypothetical game.
This test evaluates your ability to design, implement, and explain a multi-component system as a senior engineer end to end.

- The goal is not production-grade code but a clear demonstration of quality, functionality, and thought process.
- **Timebox:** The test is designed to be completed in 4 hours or less.
- **Commit Often:** Show your working process through regular commits.
- **External dependencies:** Use any external dependencies you see fit, you do not need to implement everything from scratch.
- **Keep It Minimal:** Use lightweight libraries and avoid adding unnecessary features, or over-engineering the solution.

## Requirements

- API:
  - Create a REST-compliant API to ingest events.
  - Ensure the API is type-safe and validates input at runtime.
- Queue:
  - Queue the ingested data for processing using a worker system.
- Worker:
  - Implement a worker to process the queued data.
- Database:
  - Store the processed data in a database.
  - Develop a schema to store the data.
- Unit Test:
  - Write one unit test for a critical part of the system.
- Self Contained & Docker Compose:
  - Ensure everything required to run the system is in the repository.
  - Provide a `docker-compose.yml` file to run external dependencies (e.g database)
  - Document the commands to run the system.

## Questions

- What did you use for the API and why?
  I use Express because it is lightweight, fast, and flexible. For type-safety, we will use TypeScript along with Zod for input validation.
  Express is a commonly used framework with good support for REST APIs. Zod provides runtime validation to ensure the data is in the correct format.

- What queue/worker system did you choose and why?
  BullMQ. It’s easy to integrate with Node.js and supports job retries, scheduling, and job prioritization, which is useful for handling game events in the queue.

- What database did you use and why?
  PostgreSQL. It can scale well, and its schema-based nature fits well with structured game event data. Prisma offers strong type safety.

- What key decisions did you make about how the system is structured and why?
  Separation of concerns for API, worker, queue, and database. It improves maintainability and enhance reusability.
  Focused on type-safety and validation to ensure data integrity.

> [!IMPORTANT]
> Answer the above questions in this file

## Extra Credit

- Implement a retry mechanism in the worker for failed jobs
- Include a performance optimization (e.g. batch processing in the worker)
- Create additional tests for edge cases

#### Steps to run

- npm i
- npm run migrate

# Docker

- NODE_ENV=dev docker-compose up --build

# local

- install redis
- install postgres
- update db config in .env file
- npm run worker
- npm run dev
