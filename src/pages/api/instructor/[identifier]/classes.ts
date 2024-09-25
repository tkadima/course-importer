
import { handleDynamicQuery } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

// Get all classes for a instructor by id
// localhost:3000/api/instructor/{id}/classes
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    let baseQuery = `
    SELECT class.* 
    FROM instructor 
    JOIN class ON class.instructor_id = instructor.id 
    WHERE instructor.id = ?
  `

return handleDynamicQuery(req, res, baseQuery)
}
