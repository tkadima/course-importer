import { getDb } from '@/database'
import { NextApiRequest, NextApiResponse } from 'next'

// Get all the enrollments for a class
// localhost:3000/api/courses/{id}/students?type=id
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const db = await getDb()
    const { identifier, type } = req.query

    if (req.method === 'GET') {
      if (!identifier || !type) {
        return res
          .status(400)
          .json({ error: 'Both identifier and type are required' })
      }

      let query: string
      let params: any[] = [identifier]

      if (type === 'id') {
        query = 'SELECT * FROM enrollment WHERE class_id = ?'
        console.log('query:', query)
      } else {
        return res.status(400).json({ error: 'Invalid type' })
      }

      const data = await db.all(query, params)
      res.status(200).json(data)
    }
  } catch (error) {
    console.error('Failed to run query for class :', error)
    res.status(500).json({ error: 'Failed to run query for class ' })
  }
}
