
```markdown
# Assignment Submission Portal Backend

## Overview
This project is a backend system for an Assignment Submission Portal built using Node.js, Express, and MongoDB. It enables users to register, log in, upload assignments, and allows admins to manage those assignments effectively.

## Features
- User registration and login
- JWT authentication for secure access
- Assignment upload functionality
- Admin functionalities to view, accept, and reject assignments

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [License](#license)
- [Author](#author)

## Installation

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or use a cloud provider like MongoDB Atlas)

### Steps
1. Clone the Repository:
   ```bash
   git clone https://github.com/yekaditya15/Assignment_Submission_Portal_Backend.git
   cd Assignment_Submission_Portal_Backend
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` File:
   Create a `.env` file in the root of your project directory. This file will hold your environment variables.

   ```plaintext
   MONGO_URI=mongodb://<username>:<password>@localhost:27017/<database>
   JWT_SECRET=your_jwt_secret
   PORT=8000
   ```

   Replace `<username>`, `<password>`, and `<database>` with your MongoDB credentials.

## Configuration
Make sure your MongoDB server is running. If you're using MongoDB Atlas, ensure you have your IP whitelisted for connections.

## Running the Application
1. Start the Server:
   ```bash
   npm start
   ```

2. Access the Application:
   Open your browser or API client and navigate to the endpoints mentioned below.

## API Endpoints

### User Endpoints
- Register a new user:
  - URL: `/api/users/register`
  - Method: `POST`
  - Request Body:
    ```json
    {
      "name": "User Name",
      "email": "user@example.com",
      "password": "userpassword",
      "role": "user"
    }
    ```

- Login a user or admin:
  - URL: `/api/users/login`
  - Method: `POST`
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "userpassword"
    }
    ```

- Upload an assignment:
  - URL: `/api/users/upload`
  - Method: `POST`
  - Request Body:
    ```json
    {
      "userId": "user@example.com",
      "task": "Description of the task",
      "admin": "admin@example.com"
    }
    ```

- Get all admins:
  - URL: `/api/users/admins`
  - Method: `GET`

### Admin Endpoints
- View all assignments:
  - URL: `/api/admins/assignments`
  - Method: `GET`

- Accept an assignment:
  - URL: `/api/admins/assignments/:id/accept`
  - Method: `POST`

- Reject an assignment:
  - URL: `/api/admins/assignments/:id/reject`
  - Method: `POST`

### Authentication
For protected routes (admin actions), include a Bearer token in your request headers:
```
Authorization: Bearer <token>
```

## Usage
To use the application, follow the steps under the Running the Application section. You can test the endpoints using tools like Postman or curl.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author
Yekaditya  
[GitHub Profile](https://github.com/yekaditya15)
```

### Instructions:
1. Update the `.env` section with accurate MongoDB credentials.
2. Review the API endpoints to ensure they match your actual routes.
3. Add additional sections if needed, such as contribution guidelines or acknowledgments.
