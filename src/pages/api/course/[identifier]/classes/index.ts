
import { handleDynamicQuery } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

// Get all classes for a course by id
// localhost:3000/api/course/{id}/classes

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    let baseQuery = `
    SELECT class.* 
    FROM class 
    JOIN course ON course.id = class.course_id 
    WHERE course_id = ?
  `

return handleDynamicQuery(req, res, baseQuery)
}
