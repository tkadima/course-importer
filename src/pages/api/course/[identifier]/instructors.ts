import { handleDynamicQuery } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

// Get all the instructors that teach a given course 
// localhost:3000/api/courses/{id}/instructors
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const query = `
    SELECT DISTINCT instructor.* 
    FROM course 
    JOIN class ON course.id = class.course_id
    JOIN instructor ON class.instructor_id = instructor.id
    WHERE course_id = ?
  `
  return handleDynamicQuery(req, res, query)
}
