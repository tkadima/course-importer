import { handleGet } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

// Get a course by its id
// localhost:3000/api/course/{id}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return handleGet(req, res, 'SELECT * FROM course WHERE id = ?')
}
