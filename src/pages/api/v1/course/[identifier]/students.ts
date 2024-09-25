import { handleDynamicQuery } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

// Get all the students that are enrolled in a given course
// localhost:3000/api/courses/{id}/students
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const query = `
    SELECT student.*, grade 
    FROM student 
    JOIN enrollment ON student.id = enrollment.student_id 
    JOIN class ON class.id = enrollment.class_id
    JOIN course ON course.id = class.course_id
    WHERE course_id = ?
  `
  return handleDynamicQuery(req, res, query)
}
