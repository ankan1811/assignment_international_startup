### Purposefully, I have kept the .env file so that the setup becomes easy. Obviously,it will be gitignored in a real scenario

## Base URL (frontend)

The base URL for all endpoints is: `http://localhost:3000/`

## To Run (frontend server)

### 1.npm install 2.npm start

## To Run (backend server)

### 1.npm install 2.npm start

## Authentication

### Authentication is required for certain endpoints.

### ( So in postman from the Authorization tab choose "Bearer Token" and paste the token which you received from login route)

# On the frontend:-

### Register User

- **Endpoint:** `/register`
- **Method:** `POST`
- **Description:** Register a new user by providing username, email,role and password in the request body. Role should be exactly "user" or "admin".it will automatically navigate to http://localhost:3000/login route.

### Login User

- **Endpoint:** `/login`
- **Method:** POST
  Description: Authenticate and log in a user. Provide email and password in the request body.it will automatically navigate to http://localhost:3000/dashboard route.

### View dashboard according to role:

- **Endpoint:** `/dashboard`
- **Method:** GET
  Description: If role is "user",it returns content from user dashboard.If role is "admin",it returns content from admin dashboard.

## Base URL (backend) (If you want to test by postman)

The base URL for all endpoints is: `http://localhost:4000/`

# On the backend:-

### Register User

- **Endpoint:** `/api/register`
- **Method:** `POST`
- **Description:** Register a new user by providing username, email, and password in the request body.
- **Request Body:**

  ```json
  {
    "username": "example_user",
    "email": "user@example.com",
    "password": "password123"(minimum length:6),
    "role":"user" (or role:"admin")
  }
  ```

### Login User

- **Endpoint:** `/api/login`
- **Method:** POST
  Description: Authenticate and log in a user. Provide email and password in the request body.

Request Body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response: Returns a JWT token if successful for further authentication.
