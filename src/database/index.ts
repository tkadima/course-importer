import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import fs from 'fs'
import path from 'path'

const dbPromise = open({
  filename: path.join(process.cwd(), 'src', 'database', 'db.sqlite'),
  driver: sqlite3.Database,
})

export const getDb = async (): Promise<Database> => {
  try {
    const db = await dbPromise
    return db
  } catch (error) {
    console.error('Failed to open the database:', error)
    throw error
  }
}

export const runMigration = async () => {
  try {
    const db = await getDb()
    const migrationPath = path.join(
      process.cwd(),
      'src',
      'database',
      'migrations',
      '0001_initial.sql',
    )
    const migration = fs.readFileSync(migrationPath, 'utf-8')

    await db.exec(migration)
    console.log('Migration ran successfully.')
  } catch (error) {
    console.error('Failed to run migration:', error)
    throw error
  }
}
