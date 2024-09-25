
import { handleDynamicQuery } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

// Get all grades for a student with a given id
// localhost:3000/api/student/{id}/grades
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    let baseQuery = `
    SELECT DISTINCT course.title, course.code, class.semester, class.year, enrollment.grade
    FROM student 
    JOIN enrollment ON enrollment.student_id = student.id
    JOIN class ON enrollment.class_id = class.id
    JOIN course ON class.course_id = course.id
    WHERE student.id = ?
  `

return handleDynamicQuery(req, res, baseQuery)
}
