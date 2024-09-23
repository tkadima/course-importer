CREATE TABLE IF NOT EXISTS student (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS instructor (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS course (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    subject TEXT NOT NULL,
    credits INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS class (
    id TEXT PRIMARY KEY NOT NULL,
    course_id  TEXT NOT NULL REFERENCES course(id),
    instructor_id TEXT NOT NULL REFERENCES instructor(id),
    semester TEXT NOT NULL,
    year INTEGER NOT NULL
);


CREATE TABLE IF NOT EXISTS enrollment (
    id TEXT PRIMARY KEY NOT NULL,
    class_id TEXT NOT NULL REFERENCES class(id),
    student_id TEXT NOT NULL REFERENCES student(id),
    grade INTEGER
);
