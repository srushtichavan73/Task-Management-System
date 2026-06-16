# 📋 Task Management App - Backend

A full-featured Task Management REST API built with Spring Boot, Spring Security, JWT Authentication, and MySQL.

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-green)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-red)

## 🚀 Features

- JWT Authentication (Register & Login)
- Project Management (Create, Read, Update, Delete)
- Task Management with Kanban Status (TODO, IN_PROGRESS, REVIEW, DONE)
- Task Priority Levels (LOW, MEDIUM, HIGH, CRITICAL)
- Comment System on Tasks
- Role-based Access (ADMIN, MANAGER, MEMBER)
- RESTful API Design

##  Tech Stack

| Technology | Usage |
|---|---|
| Java 17 | Programming Language |
| Spring Boot 3.2.5 | Backend Framework |
| Spring Security | Authentication & Authorization |
| JWT (jjwt 0.11.5) | Token-based Authentication |
| Spring Data JPA | Database ORM |
| MySQL 8.0 | Database |
| Lombok | Boilerplate Reduction |
| Maven | Build Tool |

## 📁 Project Structure

src/main/java/com/taskapp/
├── config/         # Security & CORS Configuration
├── controller/     # REST API Controllers
├── dto/            # Data Transfer Objects
├── exception/      # Global Exception Handler
├── model/          # Entity Classes
├── repository/     # JPA Repositories
├── security/       # JWT Filter & Utilities
└── service/        # Business Logic

## 🗄️ Database Schema

- users - User accounts with roles
- projects - Project management
- project_members - Many-to-many project membership
- tasks - Tasks with status and priority
- comments - Comments on tasks
- notifications - User notifications

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login & get JWT token |

### Projects
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/projects | Get all projects |
| POST | /api/projects | Create project |
| GET | /api/projects/{id} | Get project by ID |
| PUT | /api/projects/{id} | Update project |
| DELETE | /api/projects/{id} | Delete project |

### Tasks
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/projects/{id}/tasks | Get tasks by project |
| POST | /api/projects/{id}/tasks | Create task |
| PUT | /api/tasks/{id} | Update task |
| PATCH | /api/tasks/{id}/status | Update task status |
| DELETE | /api/tasks/{id} | Delete task |

### Comments
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/tasks/{id}/comments | Get comments |
| POST | /api/tasks/{id}/comments | Add comment |
| DELETE | /api/comments/{id} | Delete comment |

##  Setup & Run

### Prerequisites
- Java 17
- MySQL 8.0
- Maven

### Steps

1. Clone the repository
git clone https://github.com/srushtichavan73/task-management-backend.git

2. Create MySQL database
CREATE DATABASE taskmanagement_db;

3. Update application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskmanagement_db
spring.datasource.username=root
spring.datasource.password=your_password

4. Run the application
mvn spring-boot:run

5. API runs on http://localhost:8080

##  Developer

Srushti Chavan
- GitHub: https://github.com/srushtichavan73
- LinkedIn: https://linkedin.com/in/srushti-chavan-7a3283380
