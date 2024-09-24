### Senior Software Engineer - Backend Assignment

#### Overview:

You are tasked with creating a script that ingests data from a CSV file and inserts it into a SQLite database. The data represents a **university course registration system** that tracks courses, students, instructors, and grades. Your goal is to design a system that can store this data effectively, allowing for efficient querying and management as the dataset grows.

#### The Data:

The CSV contains the following columns:

- **Student Name**
- **Student Email**
- **Course Title**
- **Course Code**
- **Course Subject**
- **Course Credit**
- **Instructor Name**
- **Instructor Email**
- **Semester** (e.g., Fall 2024)
- **Grade** as a percent
  This data should be structured in a way that allows for efficient querying without unnecessary redundancy.

#### Requirements:

1. **Script**: Write a script that reads the CSV file, processes the data, and inserts it into a SQLite database.
2. **Efficient Querying**: The database should allow for efficient querying, supporting examples like:
   - List all courses a specific student is enrolled in for a particular semester.
   - Retrieve all students taught by a specific instructor in any semester.
   - Find the average grade for a specific course.
   - List all instructors teaching in a given semester and the courses they are teaching.
3. **Scalability**: Consider how your solution can handle a growing number of students, courses, instructors, and semesters as the university expands.

#### Use Cases:

1. **Data Entry**: The script should process and insert the CSV data into the database efficiently, handling errors where necessary.
2. **Data Retrieval**: The database should support complex queries, such as:
   - Retrieving all students enrolled in a specific course for a given semester.
   - Summarizing the performance of students (average grades) across different courses and instructors.
   - Listing all courses an instructor has taught over time.

#### Deliverables:

1. **Script**: A script (in any language of your choice) to process and insert the data into the SQLite database.
2. **Database Diagram**: A visual representation of your schema.
3. **Documentation**: A brief write-up explaining your design decisions and how you expect the system to scale in the future. Include examples of how the data could be queried via an API.

#### Expectations:

- **Efficiency**: The script should efficiently process and insert the data.
- **Structure**: The database design should reflect thoughtful consideration for managing relationships between students, instructors, courses, and semesters.
- **Documentation**: Your write-up should explain your thought process and the reasoning behind your design choices.
