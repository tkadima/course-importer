import { getDb } from '@/database'
import { NextApiRequest, NextApiResponse } from 'next'

// Get the students with the top students for a class
// localhost:3000/api/class/{id}/students/top?type=id&count={count}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const db = await getDb()
    const { identifier, type, count } = req.query

    if (req.method === 'GET') {
      if (!identifier || !type) {
        return res
          .status(400)
          .json({ error: 'Both identifier and type are required' })
      }

      let query: string
      let params: any[] = [identifier]
      let limit = count ? `LIMIT ${count}` : ''

      if (type === 'id') {
        query =
          'SELECT name, email, grade FROM enrollment JOIN student ON student.id = enrollment.student_id WHERE class_id = ? ORDER BY grade DESC ' +
          limit
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
