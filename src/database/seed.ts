import sqlite3, { Statement } from 'sqlite3'
import { open } from 'sqlite'
import fs from 'fs'
import path from 'path'
import * as readline from 'readline'
import { v4 as uuidv4 } from 'uuid'
import { parse } from 'csv-parse/sync'

// Define column indices for CSV
const columns = {
  student_name: 0,
  student_email: 1,
  course_title: 2,
  course_code: 3,
  subject: 4,
  credit: 5,
  instructor_name: 6,
  instructor_email: 7,
  semester: 8,
  year: 9,
  grade: 10,
}

// Helper to check if a student already exists in the database
async function studentExists(db: any, email: string) {
  const result = await db.get('SELECT 1 FROM student WHERE email = ?', [email])
  return result !== undefined
}

// Helper to check if an instructor already exists in the database
async function instructorExists(db: any, email: string) {
  const result = await db.get('SELECT 1 FROM instructor WHERE email = ?', [
    email,
  ])
  return result !== undefined
}

// Helper to check if a course already exists in the database
async function courseExists(db: any, courseCode: string) {
  const result = await db.get('SELECT 1 FROM course WHERE code = ?', [
    courseCode,
  ])
  return result !== undefined
}

// Helper to prepare SQL insert statements
async function prepareStatements(db: any) {
  const studentStmt = await db.prepare(
    'INSERT INTO student (id, name, email) VALUES (?, ?, ?)',
  )
  const instructorStmt = await db.prepare(
    'INSERT INTO instructor (id, name, email) VALUES (?, ?, ?)',
  )
  const courseStmt = await db.prepare(
    'INSERT INTO course (id, title, code, subject, credits) VALUES (?, ?, ?, ?, ?)',
  )

  return { studentStmt, instructorStmt, courseStmt }
}

// Helper to run migrations
async function runMigrations(db: any) {
  const migrationFilePath = path.resolve(
    __dirname,
    'migrations',
    '0001_initial.sql',
  )
  const tableCreationScript = await fs.promises.readFile(
    migrationFilePath,
    'utf-8',
  )
  console.log('Executing table creation script...')
  await db.exec(tableCreationScript)
}

// Helper to parse and insert student, instructor, and course data
async function processLine(
  line: string,
  statements: {
    studentStmt: Statement
    instructorStmt: Statement
    courseStmt: Statement
  },
  db: any,
) {
  const parsedLine = parse(line, {
    delimiter: ',',
    columns: false,
    skip_empty_lines: true,
    relax_quotes: true,
  })[0]

  const studentName = parsedLine[columns.student_name]
  const studentEmail = parsedLine[columns.student_email]
  const courseTitle = parsedLine[columns.course_title]
  const courseCode = parsedLine[columns.course_code]
  const credits = parsedLine[columns.credit]
  const subject = parsedLine[columns.subject]
  const instructorName = parsedLine[columns.instructor_name]
  const instructorEmail = parsedLine[columns.instructor_email]

  // Check if the student exists
  if (!(await studentExists(db, studentEmail))) {
    statements.studentStmt.run(uuidv4(), studentName, studentEmail)
  }

  // Check if the instructor exists
  if (!(await instructorExists(db, instructorEmail))) {
    statements.instructorStmt.run(uuidv4(), instructorName, instructorEmail)
  }

  // Check if the course exists
  if (!(await courseExists(db, courseCode))) {
    statements.courseStmt.run(
      uuidv4(),
      courseTitle,
      courseCode,
      subject,
      credits,
    )
  }
}

async function importCourseData(filePath: string) {
  const db = await open({
    filename: path.join(process.cwd(), 'src', 'database', 'db.sqlite'),
    driver: sqlite3.Database,
  })

  console.log('Database opened successfully!')

  await runMigrations(db)

  console.log('Table created successfully!')

  const { studentStmt, instructorStmt, courseStmt } =
    await prepareStatements(db)

  const fileStream = fs.createReadStream(filePath)
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let i = 0

  for await (const line of rl) {
    if (i === 1000) break
    if (i !== 0) {
      // Skip header
      await processLine(line, { studentStmt, instructorStmt, courseStmt }, db)
    }
    i++
  }

  // Finalize statements
  await studentStmt.finalize()
  await instructorStmt.finalize()
  await courseStmt.finalize()

  console.log('Database seeded successfully!')
}

// Start the seeding process
importCourseData('university_courses.csv').catch((err) => {
  console.error('Error seeding database with CSV data:', err)
})
