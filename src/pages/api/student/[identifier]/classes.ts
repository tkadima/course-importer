
import { handleDynamicQuery } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

// Get all classes for a student by id
// localhost:3000/api/student/{id}/classes
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    let baseQuery = `
    SELECT class.* 
    FROM class 
    JOIN enrollment ON enrollment.class_id = class.id
    JOIN student ON student.id = enrollment.student_id 
    WHERE student.id = ?
  `

return handleDynamicQuery(req, res, baseQuery)
}
