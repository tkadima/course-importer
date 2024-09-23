import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import fs from 'fs'
import path from 'path'
import * as readline from 'readline';
import { parse } from 'csv-parse/sync';

const columns = { 
  'student_name': 0,
  'student_email': 1,
  'course_name': 2,
  'course_code': 3,
  'subject': 4,
  'instructor_name': 5,
  'instructor_email': 6,
  'semester': 7,
  'year': 8,
  'grade': 9,
}
async function importCourseData(filePath: string) {
  const db = await open({
    filename: path.join(process.cwd(), 'src', 'database', 'db.sqlite'),
    driver: sqlite3.Database,
  })

  console.log('Database opened successfully!')

  const migrationFilePath = path.resolve(
    __dirname,
    'migrations',
    '0001_initial.sql',
  )

  console.log('creating the table creation script...')

  // Ensure the table creation script has been run
  const tableCreationScript = await fs.promises.readFile(
    migrationFilePath,
    'utf-8',
  )
  console.log('Executing table creation script...')
  await db.exec(tableCreationScript)

  console.log('Table created successfully!')

  const fileStream = fs.createReadStream(filePath);

  console.log('Reading file...')

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  console.log('created interface'); 

  let i = 0; 

  for await (const line of rl) {
    if ( i === 20) break; 
    const parsedLine = parse(line, {
      delimiter: ',',
      columns: false,
      skip_empty_lines: true,
      relax_quotes: true
    });
    const value = parsedLine[0][columns['student_email']];
    // Process each line here
    console.log(`${i}: Line from file: ${line} ${value}`);
    i++; 
  }


  console.log('Database seeded successfully!')
}

importCourseData('university_courses.csv').catch((err) => {
  console.error('Error seeding database with csv data:', err)
})
