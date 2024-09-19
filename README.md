# FenixVentures Task Management API

This project is a RESTful API for task management built with NestJS, TypeORM, and SQLite. It includes user authentication using JWT.

## Prerequisites

- Node.js (v21.x)
- npm (compatible with Node.js 21.x)
- Docker
- Docker Compose

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dt-jegomez/FenixVentures.git
cd FenixVentures
```

### Environment Setup

1. Create a `.env` file in the root directory:

```
DB_PATH=./src/database.sqlite
JWT_SECRET=your_jwt_secret_here
```

Replace `your_jwt_secret_here` with a secure secret key.

### Docker Setup

1. Build the Docker image:

```bash
docker-compose build
```

2. Start the containers:

```bash
docker-compose up
```

The API will be available at `http://localhost:3000`.

## API Documentation

Once the application is running, you can access the Swagger UI documentation at:

```
http://localhost:3000/api#/
```

## Authentication

The API uses JWT for authentication. To obtain a token:

1. Use the `/auth/login` endpoint with the default admin credentials:
    - Username: admin
    - Password: 1234

2. Include the token in the `Authorization` header of subsequent requests:

```
Authorization: Bearer your_token_here
```

## Running Tests

To run the test suite, you need to access the Docker container and execute the test command:

1. First, find the container ID:

```bash
docker ps
```

2. Access the container:

```bash
docker exec -it [CONTAINER_ID] /bin/bash
```

3. Once inside the container, run the tests:

```bash
npm run test
```

## Project Structure

```
FenixVentures/
├── src/
│   ├── auth/
│   ├── tasks/
│   ├── users/
│   ├── app.module.ts
│   └── main.ts
├── test/
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Support

For support, please open an issue in the GitHub repository.