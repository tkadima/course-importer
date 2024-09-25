import { NextApiRequest, NextApiResponse } from 'next'
import { handleDynamicQuery } from '@/utils'

// Get all the students with their grades for a class
// localhost:3000/api/class/{id}/students
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let baseQuery = `
      SELECT student.*, grade 
      FROM student 
      JOIN enrollment ON student.id = enrollment.student_id 
      WHERE class_id = ?
    `

  return handleDynamicQuery(req, res, baseQuery)
}
