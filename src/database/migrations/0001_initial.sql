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
    FOREIGN KEY(course_id ) REFERENCES course(id),
    FOREIGN KEY (instructor_id) REFERENCES instructor(id),
    semester TEXT NOT NULL,
    year INTEGER NOT NULL
);


CREATE TABLE IF NOT EXISTS enrollment (
    id TEXT PRIMARY KEY NOT NULL,
    grade INTEGER,
    FOREIGN KEY (class_id) REFERENCES class(id),
    FOREIGN KEY (student_id) REFERENCES student(id)
);

CREATE INDEX idx_student_email ON student(email);
CREATE INDEX idx_instructor_email ON instructor(email);
CREATE INDEX idx_course_code ON course(code);
CREATE INDEX idx_student_id ON ENROLLMENT(student_id);
CREATE INDEX idx_class_id ON ENROLLMENT(class_id);
CREATE INDEX idx_course_id ON CLASS(course_id);
CREATE INDEX idx_instructor_id ON CLASS(instructor_id);
