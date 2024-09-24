import { getDb } from '@/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const db = await getDb()
    const { identifier, type } = req.query
    // Gets the average grade for a course given the course id, code, 
    // localhost:3000/api/course/{id}/students?type={type}
    if (req.method === 'GET') {
      if (!identifier || !type) {
        return res
          .status(400)
          .json({ error: 'Both identifier and type are required' })
      }

      let query: string
      let params: any[] = [identifier]

      if (type === 'id') {
        query = `SELECT name, email FROM enrollment JOIN class ON class.id = enrollment.class_id WHERE course_id = ?`
      } else if (type === 'code' || type === 'subject') {
        query = `SELECT AVG(grade) FROM enrollment JOIN class ON class.id = enrollment.class_id JOIN course ON course.id = class.course_id WHERE ${type} = ?`
      }
      else {
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
