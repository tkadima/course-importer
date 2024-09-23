CREATE TABLE IF NOT EXISTS student (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS instructor (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS course (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    code TEXT NOT NULL,
    subject TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS class (
    id TEXT PRIMARY KEY,
    courseId  TEXT NOT NULL REFERENCES course(id),
    instructorID TEXT NOT NULL REFERENCES instructor(id),
    semester TEXT NOT NULL,
    year INTEGER NOT NULL
);


CREATE TABLE IF NOT EXISTS enrollment (
    id TEXT PRIMARY KEY,
    classId TEXT NOT NULL REFERENCES class(id),
    studentId TEXT NOT NULL REFERENCES student(id),
    grade INTEGER
);

