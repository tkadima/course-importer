import { getDb } from '@/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const db = await getDb()
    const { identifier, type } = req.query
    // Get course by id, title, code, subject, or credits
    // localhost:3000/api/course/{id}/index?type={type}
    if (req.method === 'GET') {
      if (!identifier || !type) {
        return res
          .status(400)
          .json({ error: 'Both identifier and type are required' })
      }

      let query: string
      let params: any[] = [`%${identifier}%`]

      if (type === 'id') {
        query = 'SELECT * FROM course WHERE id LIKE ?'
      } else if (type === 'title') {
        query = 'SELECT * FROM course WHERE title LIKE ?'
      } else if (type === 'code') {
        query = 'SELECT * FROM course WHERE code LIKE ?'
      } else if (type === 'subject') {
        query = 'SELECT * FROM course WHERE subject LIKE ?'
      } else if (type === 'credits') {
        query = 'SELECT * FROM course WHERE credits LIKE ?'
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
