import { getDb } from '@/database'
import { getParams } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const db = await getDb()
    const { identifier, type, ...otherParams } = req.query
    // Get all grades for a student by id or email for a student (name is not unique)
    // localhost:3000/api/student/{identifier}/classes?type={type}
    if (req.method === 'GET') {
      if (!identifier || !type) {
        return res
          .status(400)
          .json({ error: 'Both identifier and type are required' })
      }

      let query: string

      if (type === 'id') {
        query = `SELECT title, credits, semester, year, grade FROM enrollment JOIN class ON class.id = enrollment.class_id JOIN course ON class.course_id = course.id WHERE student_id = '${identifier}'`
      } else if (type === 'email') {
        query = `SELECT title, credits, semester, year, grade FROM enrollment JOIN class ON class.id = enrollment.class_id JOIN course ON class.course_id = course.id JOIN student ON student.id = enrollment.student_id WHERE email = '${identifier}'`
      } else {
        return res.status(400).json({ error: 'Invalid type' })
      }

      let { params, newQuery } = getParams(query, otherParams, true)

      const data = await db.all(newQuery, params)
      res.status(200).json(data)
    }
  } catch (error) {
    console.error('Failed to run query for student classes :', error)
    res.status(500).json({ error: 'Failed to run query for student classes' })
  }
}
