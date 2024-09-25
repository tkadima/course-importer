import { handleQuery } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

// Get all courses
// localhost:3000/api/courses
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return handleQuery(req, res, 'SELECT * FROM course')
}
