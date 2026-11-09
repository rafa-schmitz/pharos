# Pharos

A job board platform for the tech industry, connecting candidates with recruiters.

## Tech Stack

**Frontend:** React 18, TypeScript, Chakra UI, React Hook Form

**Backend:** Java 17, Spring Boot, Spring Security, JPA/Hibernate, MySQL

## Features

- **For Candidates:**
  - Browse and search job listings
  - Apply to positions
  - Build professional profile (experience, education, skills)
  - Track applied jobs

- **For Recruiters:**
  - Create and manage job postings
  - View applicants
  - Company profile management

## Getting Started

### Prerequisites

- Node.js 18+
- Java 17+
- MySQL 8.0+ (or Docker)

### Running with Docker

```bash
docker-compose up -d
```

This starts:
- MySQL database on port 3306
- Spring Boot API on port 8080
- React frontend on port 3000

### Running Locally

**Database:**
```bash
# Using Docker for just the database
docker-compose up db -d
```

**Backend:**
```bash
cd backend
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## Project Structure

```
pharos/
├── backend/           # Spring Boot API
│   ├── src/main/java/com/application/faros/
│   │   ├── controller/    # REST endpoints
│   │   ├── model/         # JPA entities
│   │   ├── repository/    # Data access
│   │   ├── service/       # Business logic
│   │   ├── serializers/   # DTOs
│   │   └── infra/         # Security & error handling
│   └── src/main/resources/
│       └── application.yml
│
├── frontend/          # React application
│   ├── src/
│   │   ├── components/    # Shared components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React contexts
│   │   ├── services/      # API calls
│   │   ├── hooks/         # Custom hooks
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── public/
│
└── docker-compose.yml # Full stack orchestration
```

## Environment Variables

**Frontend (.env):**
```
REACT_APP_BASE_URL=http://localhost:8080
```

**Backend (application.yml):**
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/faros
    username: root
    password: root
```

## License

MIT
