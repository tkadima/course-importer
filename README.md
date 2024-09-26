# Course Importer

An API for a database seeded by a script that imports student grade data into a SQLite database.

## Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/tkadima/course-importer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the seed command to import the data from the CSV and populate the database:
   ```bash
   npm run seed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   or run 
   ```bash 
   docker-compose up
   ```

   The API will be running locally at `http://localhost:3000`.

## Running API Queries

Once the application is running on `localhost:3000`, you can query the API by making requests to the available endpoints. Below are some example queries you can make:

- **Get all courses:**
  ```bash
  GET http://localhost:3000/api/course
  ```

- **Get a specific course by ID:**
  ```bash
  GET http://localhost:3000/api/course/{id}
  ```

- **Get all classes for a course:**
  ```bash
  GET http://localhost:3000/api/course/{id}/classes
  ```

- **Get all students in a course:**
  ```bash
  GET http://localhost:3000/api/course/{id}/students
  ```

- **Get a specific student by ID:**
  ```bash
  GET http://localhost:3000/api/student/{id}
  ```

- **Get all classes a student is enrolled in with their grades:**
  ```bash
  GET http://localhost:3000/api/student/{id}/classes
  ```

For a full list of endpoints and detailed documentation on how to use them, check out the [API Documentation](./api-documentation.md).

