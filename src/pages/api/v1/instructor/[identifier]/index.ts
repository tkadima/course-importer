import { handleGet } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

// Get an instructor by its id
// localhost:3000/api/instructor/{id}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return handleGet(req, res, 'SELECT * FROM instructor WHERE id = ?')
}
