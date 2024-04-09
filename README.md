# SpringTodo

Welcome to the SpringTodo project repository! This project is a full-stack Todo list application, designed to showcase a modern application stack that includes a React frontend, a Node.js backend, and a PostgreSQL database, all neatly containerized with Docker.

## Prerequisites

Before you get started, you'll need to have the following tools installed on your machine:

- Docker and Docker Compose (for running the application containers)
- Git (for version control)

Links to installation guides:

- [Docker](https://docs.docker.com/get-docker/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Getting Started

To get a local copy up and running, follow these simple steps:

1. Clone the repository:

```bash
git clone git@github.com:Huthifakhraishah/SpringTodo.git
cd SpringTodo
```

2. Build and start the containers:

```bash
docker-compose up --build
```

This command will set up the entire application stack, including the database, backend, and frontend services, as defined in the `docker-compose.yml` file.

4.  Database Migrations:

- After the containers are up, you need to run migrations to set up your database schema. Navigate to the `backend/prisma` folder and run:

  ```bash
  cd backend && cd src && cd prisma
  npx prisma migrate dev
  ```

  This command applies the migrations necessary for your PostgreSQL database.

## Accessing the Application

Once the application is running, you can access:

- The frontend at [http://localhost](http://localhost)
- The backend API directly at [http://localhost:3001](http://localhost:3001)

For database access, use your preferred PostgreSQL client to connect to `localhost:5432` with the credentials specified in the `docker-compose.yml` file.

## Project Architecture

This project is structured as follows:

- **Frontend**: A React application providing the user interface for managing tasks.
- **Backend**: A Node.js application using Express.js to offer RESTful API endpoints for task management.
- **Database**: A PostgreSQL database storing user and task information.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
