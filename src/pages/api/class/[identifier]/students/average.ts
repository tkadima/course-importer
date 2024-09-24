import { getDb } from '@/database'
import { NextApiRequest, NextApiResponse } from 'next'

// Gets the average grade for a class given the class id
// localhost:3000/api/class/{id}/students/average?type=id
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
        query = 'SELECT AVG(grade) FROM enrollment WHERE class_id = ?'
      } else {
        return res.status(400).json({ error: 'Invalid type' })
      }

      const data = await db.get(query, params)
      res.status(200).json({ class_average: Math.round(data['AVG(grade)']) })
    }
  } catch (error) {
    console.error('Failed to run query for class :', error)
    res.status(500).json({ error: 'Failed to run query for class ' })
  }
}
