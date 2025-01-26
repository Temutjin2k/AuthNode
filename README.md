
# Node.js Authentication and Authorization

This project implements user authentication and authorization using Node.js, JWT (JSON Web Tokens), and bcrypt for password hashing. The application allows users to register, login, and access protected routes after a successful authentication.

## Features
  - Course: Web Technologies 2 (Backend)
  - Student: Temutjin Koszhanov
  - Teacher: Alisher Amirov

## Technologies Used
  - PostgreSQL
  - Node.js
  - Express
  - JWT (JSON Web Tokens)
  - bcrypt (for password hashing)

## Setup

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Temutjin2k/AuthNode
   ```

2. Install dependencies:
   ```bash
   cd AuthNode
   npm install
   ```

3. Create a `.env` file in the root of the project with the following content:
   ```env
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_PORT=
    DB_NAME=
    SECRET=your-jwt-secret-key
   ```

4. Start the server:
   ```bash
   node node.js
   ```

5. The server will be running on `http://localhost:8080`.

## Endpoints

### 1. **POST /api/register**
   - **Description**: Registers a new user.
   - **Body**:
     ```json
     {
       "first_name": "Temutjin",
       "last_name": "Koszhanov",
       "email": "tamutdzhin@mail.com",
       "password": "verysecretpassword"
     }
     ```

### 2. **POST /api/login**
   - **Description**: Logs in a user and returns a JWT token.
   - **Request Body**:
     ```json
     {
       "email": "tamutdzhin@mail.com",
       "password": "verysecretpassword"
     }
     ```
   - **Response**:
     ```json
     {
       "token": "jwt token"
     }
     ```

### 3. **GET /api/profile/info**
   - **Description**: Retrieves user profile information (protected route).
   - **Request Headers**:
     - `Authorization: Bearer <jwt-token>`
   - **Response**:
     ```json
      {
        "first_name": "Temutjin",
        "last_name": "Koszhanov",
        "email": "tamutdzhin2006@mail.ru"
      }
     ```
