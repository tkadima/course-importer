import sqlite3, { Statement } from 'sqlite3'
import { open } from 'sqlite'
import fs from 'fs'
import path from 'path'
import * as readline from 'readline'
import { v4 as uuidv4 } from 'uuid'
import { parse } from 'csv-parse/sync'
import {
  prepareStatements,
  studentExists,
  instructorExists,
  courseExists,
  classExists,
  enrollmentExists,
  getStudentId,
  getInstructorId,
  getCourseId,
  getClassId,
} from './utils'

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
  grade: 9,
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

// parse and insert data into the database
async function processLine(
  line: string,
  statements: {
    studentStmt: Statement
    instructorStmt: Statement
    courseStmt: Statement
    classStmt: Statement
    enrollmentStmt: Statement
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
  const semester = parsedLine[columns.semester].split(' ')[0]
  const year = parsedLine[columns.semester].split(' ')[1]
  const grade = parsedLine[columns.grade]

  // Check if the student exists, then insert if not
  if (!(await studentExists(db, studentEmail))) {
    statements.studentStmt.run(uuidv4(), studentName, studentEmail)
  }

  // Check if the instructor exists, then insert if not
  if (!(await instructorExists(db, instructorEmail))) {
    statements.instructorStmt.run(uuidv4(), instructorName, instructorEmail)
  }

  // Check if the course exists, then insert if not
  if (!(await courseExists(db, courseCode))) {
    statements.courseStmt.run(
      uuidv4(),
      courseTitle,
      courseCode,
      subject,
      credits,
    )
  }
  // Get the IDs for the instructor, and course to be used in the class tables
  const instructorId = await getInstructorId(db, instructorEmail)
  const courseId = await getCourseId(db, courseCode)

  // Check if the class exists, then insert if not
  if (!(await classExists(db, instructorId, courseId, semester, year))) {
    statements.classStmt.run(uuidv4(), instructorId, courseId, semester, year)
  }

  // Get the class ID and student ID to be used in the enrollment table
  const classId = await getClassId(db, instructorId, courseId)
  const studentId = await getStudentId(db, studentEmail)

  if (!(await enrollmentExists(db, studentId, courseId))) {
    statements.enrollmentStmt.run(uuidv4(), studentId, classId, grade)
  }
}

async function importCourseData(filePath: string) {
  const startTime = Date.now() // create and start timer for script

  const db = await open({
    filename: path.join(process.cwd(), 'src', 'database', 'db.sqlite'),
    driver: sqlite3.Database,
  })

  console.log('Database opened successfully!')

  await runMigrations(db)

  console.log('Table created successfully!')

  const { studentStmt, instructorStmt, courseStmt, classStmt, enrollmentStmt } =
    await prepareStatements(db)

  const fileStream = fs.createReadStream(filePath)
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let i = 0
  for await (const line of rl) {
    if (i !== 0) {
      // Skip header
      await processLine(
        line,
        { studentStmt, instructorStmt, courseStmt, classStmt, enrollmentStmt },
        db,
      )
    }
    i++
  }

  // Finalize statements
  await studentStmt.finalize()
  await instructorStmt.finalize()
  await courseStmt.finalize()
  await classStmt.finalize()
  await enrollmentStmt.finalize()

  const endTime = Date.now() // End timer
  const totalTime = (endTime - startTime) / 1000 // Calculate time in seconds
  console.log(`Database seeded successfully! Total time: ${totalTime} seconds`)
}

// Start the seeding process
importCourseData('university_courses.csv').catch((err) => {
  console.error('Error seeding database with CSV data:', err)
})
