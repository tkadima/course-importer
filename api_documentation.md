### API Documentation:

#### **GET `/api/class`**

**Description:** Retrieves all class data from the database, with optional filtering based on query parameters.

- **Method:** `GET`
- **Endpoint:** `/api/class`
- **Query Parameters:**
  - You can filter results using query parameters that match columns in the `class` table. Example: `?semester=Fall&year=2023`
- **Response:**
  - **Success:** Returns a JSON array of all class records or filtered records if query parameters are provided.
  - **Error:**
    - `405 Method Not Allowed` if the request method is not `GET`.
    - `500 Internal Server Error` if there is a failure executing the query.
- **Example Request:**
  ```
  GET /api/class?semester=Fall&year=2023
  ```
- **Example Response:**
  ```json
  [
   {
        "id": "1",
        "course_id": "2",
        "instructor_id": "3",
        "semester": "Fall",
        "year": 2024
    }
    ...
  ]
  ```

---

#### **GET `/api/class/{id}`**

**Description:** Retrieves data for a specific class by its ID.

- **Method:** `GET`
- **Endpoint:** `/api/class/{id}`

  - `{id}` should be replaced with the class ID.

- **Response:**
  - **Success:** Returns a JSON object with the class data.
  - **Error:**
    - `405 Method Not Allowed` if the request method is not `GET`.
    - `500 Internal Server Error` if there is a failure executing the query.
- **Example Request:**

  ```
  GET /api/class/1
  ```

- **Example Response:**
  ```json
  {
    "id": "1",
    "course_id": "2",
    "instructor_id": "3",
    "semester": "Fall",
    "year": 2024
  }
  ```

---

#### **GET `/api/class/{id}/students`**

**Description:** Retrieves all students enrolled in a specific class, along with their grades.

- **Method:** `GET`
- **Endpoint:** `/api/class/{id}/students`
  - `{id}` should be replaced with the class ID.
- **Query Parameters:**
  - You can add optional filters using query parameters, such as filtering students based on attributes.
- **Response:**

  - **Success:** Returns a JSON array of students and their grades for the specific class.
  - **Error:**
    - `405 Method Not Allowed` if the request method is not `GET`.
    - `500 Internal Server Error` if there is a failure executing the query.

- **Example Request:**

  ```
  GET /api/class/1/students
  ```

- **Example Response:**
  ```json
  [
    {
      "id": 101,
      "name": "John Doe",
      "email": "john.doe@gmail.com",
      "grade": "90"
    },
    {
      "id": 102,
      "name": "Jane Smith",
      "email": "jane.smith@gmail.com",
      "grade": "85"
    }
  ]
  ```

---

#### **GET `/api/course`**

**Description:** Retrieves all courses, with optional filtering based on query parameters.

- **Method:** `GET`
- **Endpoint:** `/api/course`
- **Query Parameters:**

  - Filter by `title`, `subject`, `credits`, etc.

- **Response:**

  - **Success:** Returns a JSON array of all course records or filtered records.
  - **Error:** `405 Method Not Allowed` if the request method is not `GET`, `500 Internal Server Error` for query failures.

- **Example Request:**

  ```
  GET /api/course?subject=Mathematics
  ```

- **Example Response:**
  ```json
  [
    {
      "id": "course1",
      "title": "Calculus 101",
      "code": "MATH101",
      "subject": "Mathematics",
      "credits": 3
    }
  ]
  ```

---

#### **GET `/api/course/{id}`**

**Description:** Retrieves a specific course by its ID.

- **Method:** `GET`
- **Endpoint:** `/api/course/{id}`
- **Response:**

  - **Success:** Returns a JSON object with the course details.
  - **Error:** `405 Method Not Allowed`, `500 Internal Server Error`.

- **Example Request:**

  ```
  GET /api/course/course1
  ```

- **Example Response:**
  ```json
  {
    "id": "course1",
    "title": "Calculus 101",
    "code": "MATH101",
    "subject": "Mathematics",
    "credits": 3
  }
  ```

---

#### **GET `/api/course/{id}/classes`**

**Description:** Retrieves all classes associated with a specific course ID.

- **Method:** `GET`
- **Endpoint:** `/api/course/{id}/classes`

- **Response:**

  - **Success:** Returns a JSON array of all classes for the given course.
  - **Error:** `405 Method Not Allowed`, `500 Internal Server Error`.

- **Example Request:**

  ```
  GET /api/course/course1/classes
  ```

- **Example Response:**
  ```json
  [
    {
      "id": "class1",
      "course_id": "course1",
      "instructor_id": "instructor1",
      "semester": "Fall",
      "year": 2023
    }
  ]
  ```

---

#### **GET `/api/course/{id}/instructors`**

**Description:** Retrieves all instructors who teach a specific course.

- **Method:** `GET`
- **Endpoint:** `/api/course/{id}/instructors`

- **Response:**

  - **Success:** Returns a JSON array of instructors teaching the given course.
  - **Error:** `405 Method Not Allowed`, `500 Internal Server Error`.

- **Example Request:**

  ```
  GET /api/course/course1/instructors
  ```

- **Example Response:**
  ```json
  [
    {
      "id": "instructor1",
      "name": "Dr. John Doe",
      "email": "john.doe@example.com"
    }
  ]
  ```

---

#### **GET `/api/enrollment`**

**Description:** Retrieves all enrollments, with optional filtering based on query parameters.

- **Method:** `GET`
- **Endpoint:** `/api/enrollment`

- **Response:**

  - **Success:** Returns a JSON array of all enrollment records or filtered records.
  - **Error:** `405 Method Not Allowed`, `500 Internal Server Error`.

- **Example Request:**

  ```
  GET /api/enrollment
  ```

- **Example Response:**
  ```json
  [
    {
      "id": "enrollment1",
      "student_id": "student1",
      "class_id": "class1",
      "grade": 85
    }
  ]
  ```

---

#### **GET `/api/instructor`**

**Description:** Retrieves all instructors, with optional filtering.

- **Method:** `GET`
- **Endpoint:** `/api/instructor`

- **Response:**

  - **Success:** Returns a JSON array of all instructors.
  - **Error:** `405 Method Not Allowed`, `500 Internal Server Error`.

- **Example Request:**

  ```
  GET /api/instructor
  ```

- **Example Response:**
  ```json
  [
    {
      "id": "instructor1",
      "name": "Dr. John Doe",
      "email": "john.doe@example.com"
    }
  ]
  ```

---

#### **GET `/api/instructor/{id}`**

**Description:** Retrieves a specific instructor by ID.

- **Method:** `GET`
- **Endpoint:** `/api/instructor/{id}`

- **Response:**

  - **Success:** Returns a JSON object with instructor details.
  - **Error:** `405 Method Not Allowed`, `500 Internal Server Error`.

- **Example Request:**

  ```
  GET /api/instructor/instructor1
  ```

- **Example Response:**
  ```json
  {
    "id": "instructor1",
    "name": "Dr. John Doe",
    "email": "john.doe@example.com"
  }
  ```

---

#### **GET `/api/instructor/{id}/classes`**

**Description:** Retrieves all classes taught by a specific instructor.

- **Method:** `GET`
- **Endpoint:** `/api/instructor/{id}/classes`

- **Response:**

  - **Success:** Returns a JSON array of classes the instructor teaches.
  - **Error:** `405 Method Not Allowed`, `500 Internal Server Error`.

- **Example Request:**

  ```
  GET /api/instructor/instructor1/classes
  ```

- **Example Response:**
  ```json
  [
    {
      "id": "class1",
      "course_id": "course1",
      "instructor_id": "instructor1",
      "semester": "Fall",
      "year": 2023
    }
  ]
  ```

---

#### **GET `/api/instructor/{id}/courses`**

**Description:** Retrieves all courses taught by a specific instructor.

- **Method:** `GET`
- **Endpoint:** `/api/instructor/{id}/courses`

- **Response:**

  - **Success:** Returns a JSON array of courses the instructor teaches.
  - **Error:** `405 Method Not Allowed`, `500 Internal Server Error`.

- **Example Request:**

  ```
  GET /api/instructor/instructor1/courses
  ```

- **Example Response:**
  ```json
  [
    {
      "id": "course1",
      "title": "Calculus 101",
      "code": "MATH101",
      "subject": "Mathematics",
      "credits": 3
    }
  ]
  ```

---

#### **GET `/api/instructor/{id}/students`**

**Description:** Retrieves all students enrolled in the classes taught by the instructor.

- **Method:** `GET`
- **Endpoint:** `/api/instructor/{id}/students`

- **Response:**

  - **Success:** Returns a JSON array of students.
  - **Error:** `405 Method Not Allowed`, `500 Internal Server Error`.

- **Example Request:**

  ```
  GET /api/instructor/instructor1/students
  ```

- **Example Response:**
  ```json
  [
    {
      "id": "student1",
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    }
  ]
  ```

---

#### **GET `/api/student`**

**Description:** Retrieves all students, with optional filtering.

- **Method:** `GET`
- **Endpoint:** `/api/student`

- **Response:**

  - **Success:** Returns a JSON array of students.
  - **Error:** `405 Method Not Allowed`, `500 Internal Server Error`.

- **Example Request:**

  ```
  GET /api/student
  ```

- **Example Response:**
  ```json
  [
    {
      "id": "student1",
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    }
  ]
  ```

---

#### **GET `/api/student/{id}`**

**Description:** Retrieves a specific student by ID.

- **Method:** `GET`
- **Endpoint:** `/api/student/{id}`

- **Response:**

  - **Success:** Returns a JSON object with student details.
  - **Error:** `405 Method Not Allowed`, `500 Internal Server Error`.

- **Example Request:**

  ```
  GET /api/student/student1
  ```

- **Example Response:**
  ```json
  {
    "id": "student1",
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }
  ```

---

#### **GET `/api/student/{id}/classes`**

**Description:** Retrieves all classes that the student is enrolled in, along with their grades.

- **Method:** `GET`
- **Endpoint:** `/api/student/{id}/classes`

- **Response:**

  - **Success:** Returns a JSON array of classes and grades.
  - **Error:** `405 Method Not Allowed`, `500 Internal Server Error`.

- **Example Request:**

  ```
  GET /api/student/student1/classes
  ```

- **Example Response:**
  ```json
  [
    {
      "id": "class1",
      "course_id": "course1",
      "semester": "Fall",
      "year": 2023,
      "grade":
  ```
