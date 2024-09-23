import { getDb, runMigration } from '@/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await runMigration()

    const db = await getDb()

    if (req.method === 'GET') {
      const data = await db.all('SELECT * FROM users')
      res.status(200).json(data)
    }
  } catch (error) {
    console.error('Failed to run migration:', error)
    res.status(500).json({ error: 'Failed to run migration' })
  }
}
