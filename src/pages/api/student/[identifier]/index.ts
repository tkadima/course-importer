import { getDb } from '@/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const db = await getDb()
    const { identifier, type } = req.query
    // Get student by id, name, email
    // localhost:3000/api/student/{identifier}/?type={type}
    if (req.method === 'GET') {
      if (!identifier || !type) {
        return res
          .status(400)
          .json({ error: 'Both identifier and type are required' })
      }

      let query: string
      let params: any[] = [`%${identifier}%`]

      if (type === 'id') {
        query = 'SELECT * FROM student WHERE id LIKE ?'
      } else if (type === 'name') {
        query = 'SELECT * FROM student WHERE name LIKE ?'
      } else if (type === 'email') {
        query = 'SELECT * FROM student WHERE email LIKE ?'
      } else {
        return res.status(400).json({ error: 'Invalid type' })
      }

      const data = await db.all(query, params)
      res.status(200).json(data)
    }
  } catch (error) {
    console.error('Failed to run query for student :', error)
    res.status(500).json({ error: 'Failed to run query for student ' })
  }
}
