// Helper to fetch the student's ID by email
export async function getStudentId(db: any, email: string) {
  const result = await db.get('SELECT id FROM student WHERE email = ?', [email])
  return result ? result.id : null
}

// Helper to fetch the instructor's ID by email
export async function getInstructorId(db: any, email: string) {
  const result = await db.get('SELECT id FROM instructor WHERE email = ?', [
    email,
  ])
  return result ? result.id : null
}

// Helper to fetch the course's ID by course code
export async function getCourseId(db: any, courseCode: string) {
  const result = await db.get('SELECT id FROM course WHERE code = ?', [
    courseCode,
  ])
  return result ? result.id : null
}

// Helper to fetch the class's ID by instructor ID and course ID
export async function getClassId(
  db: any,
  instructorId: string,
  courseId: string,
) {
  const result = await db.get(
    'SELECT id FROM class WHERE instructor_id = ? AND course_id = ?',
    [instructorId, courseId],
  )
  return result ? result.id : null
}

// Helper to check if a student already exists in the database
export async function studentExists(db: any, email: string) {
  const result = await db.get('SELECT 1 FROM student WHERE email = ?', [email])
  return result !== undefined
}

// Helper to check if an instructor already exists in the database
export async function instructorExists(db: any, email: string) {
  const result = await db.get('SELECT 1 FROM instructor WHERE email = ?', [
    email,
  ])
  return result !== undefined
}

// Helper to check if a course already exists in the database
export async function courseExists(db: any, courseCode: string) {
  const result = await db.get('SELECT 1 FROM course WHERE code = ?', [
    courseCode,
  ])
  return result !== undefined
}

// Helper to check if a class already exists in the database
export async function classExists(
  db: any,
  studentId: string,
  courseId: string,
  semester: string,
  year: number,
) {
  const result = await db.get(
    'SELECT 1 FROM class WHERE instructor_id = ? AND course_id = ? AND semester = ? AND year = ?',
    [studentId, courseId, semester, year],
  )
  return result !== undefined
}

// Helper to check if an enrollment already exists in the database
export async function enrollmentExists(
  db: any,
  studentId: string,
  courseId: string,
) {
  const result = await db.get(
    'SELECT 1 FROM enrollment WHERE student_id = ? AND class_id = ?',
    [studentId, courseId],
  )
  return result !== undefined
}

// Helper to prepare SQL insert statements
export async function prepareStatements(db: any) {
  const studentStmt = await db.prepare(
    'INSERT INTO student (id, name, email) VALUES (?, ?, ?)',
  )
  const instructorStmt = await db.prepare(
    'INSERT INTO instructor (id, name, email) VALUES (?, ?, ?)',
  )
  const courseStmt = await db.prepare(
    'INSERT INTO course (id, title, code, subject, credits) VALUES (?, ?, ?, ?, ?)',
  )

  const classStmt = await db.prepare(
    'INSERT INTO class (id, instructor_id, course_id, semester, year) VALUES (?, ?, ?, ?, ?)',
  )

  const enrollmentStmt = await db.prepare(
    'INSERT INTO enrollment (id, student_id, class_id, grade) VALUES (?, ?, ?, ?)',
  )

  return { studentStmt, instructorStmt, courseStmt, classStmt, enrollmentStmt }
}
