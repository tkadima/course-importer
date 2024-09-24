// Get all classes for a course by id or code
// localhost:3000/api/course/{identifier}/classes?type={type}

import { getDb } from '@/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const db = await getDb()
    const { identifier, type, ...otherParams } = req.query
    if (req.method === 'GET') {
      if (!identifier || !type) {
        return res
          .status(400)
          .json({ error: 'Both identifier and type are required' })
      }

      let query: string
      let params: any[] = [identifier]

      if (type === 'id') {
        query = `SELECT class.* FROM class JOIN course ON class.course_id = course.id WHERE course.id = ?`
      } else if (type === 'code') {
        query = `SELECT class.* FROM class JOIN course ON class.course_id = course.id WHERE code = ?`
      } else {
        return res.status(400).json({ error: 'Invalid type' })
      }

      console.log('query:', query)

      const data = await db.all(query, params)
      res.status(200).json(data)
    }
  } catch (error) {
    console.error('Failed to run query for course classes :', error)
    res.status(500).json({ error: 'Failed to run query for course classes' })
  }
}
