# Course Management System API

A RESTful API for managing students, courses, and enrollments built with Next.js.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 

### Installation

1. Install dependencies:

\`\`\`bash
npm install

2. Run the server:

\`\`\`bash
npm run dev

3. The API will be available at `http://localhost:3000/api`

## API Overview

The API manages three main entities:

- **Students**: Users who can enroll in courses
- **Courses**: Courses that students can enroll in
- **Enrollments**: Relationships between students and courses

### API Endpoints

#### Student Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/students | Get list of all students |
| GET | /api/students/{id} | Get details of a specific student |
| POST | /api/students | Create a new student |
| PUT | /api/students/{id} | Update a student's information |
| DELETE | /api/students/{id} | Delete a student |

#### Course Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/courses | Get list of all courses |
| GET | /api/courses/{id} | Get details of a specific course |
| POST | /api/courses | Create a new course |
| PUT | /api/courses/{id} | Update a course |
| DELETE | /api/courses/{id} | Delete a course |

#### Enrollment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/students/{id}/courses/{cid} | Enroll a student in a course |
| DELETE | /api/students/{id}/courses/{cid} | Remove a student from a course |
| GET | /api/students/{id}/courses | List all courses a student is enrolled in |
| GET | /api/courses/{id}/students | List all students enrolled in a course |

## Sample Requests and Responses

### Get All Students

\`\`\`
GET /api/students
\`\`\`

Response:
\`\`\`json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": "2",
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
]
\`\`\`

### Create a New Student

\`\`\`
POST /api/students
Content-Type: application/json

{
  "name": "Alice Johnson",
  "email": "alice@example.com"
}
\`\`\`

Response:
\`\`\`json
{
  "id": "4",
  "name": "Alice Johnson",
  "email": "alice@example.com"
}
\`\`\`

### Enroll a Student in a Course

\`\`\`
POST /api/students/1/courses/2
\`\`\`

Response:
\`\`\`json
{
  "message": "Student enrolled successfully",
  "enrollment": {
    "studentId": "1",
    "courseId": "2"
  }
}
\`\`\`

### Get Courses for a Student

\`\`\`
GET /api/students/1/courses
\`\`\`

Response:
\`\`\`json
[
  {
    "id": "1",
    "title": "Introduction to JavaScript",
    "description": "Learn the basics of JavaScript",
    "instructor": "Dr. Smith"
  },
  {
    "id": "2",
    "title": "Advanced React",
    "description": "Deep dive into React hooks and patterns",
    "instructor": "Prof. Johnson"
  }
]
\`\`\`

## Error Handling

The API returns appropriate HTTP status codes:

- 200: Success
- 201: Resource created
- 204: No content (successful deletion)
- 400: Bad request (invalid input)
- 404: Resource not found
- 500: Server error

Error responses include a JSON object with an error message:

\`\`\`json
{
  "error": "Student not found"
}
\`\`\`

## Data Storage

For this API i have used in-memory storage for simplicity.
