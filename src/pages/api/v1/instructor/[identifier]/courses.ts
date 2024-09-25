import { handleDynamicQuery } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

// Get all courses for a instructor by id
// localhost:3000/api/instructor/{id}/courses
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let baseQuery = `
    SELECT course.* 
    FROM instructor 
    JOIN class ON class.instructor_id = instructor.id 
    JOIN course ON course.id = class.course_id
    WHERE instructor.id = ?
  `

  return handleDynamicQuery(req, res, baseQuery)
}
