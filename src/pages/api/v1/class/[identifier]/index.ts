import { handleGet } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

// Get a class by its id
// /api/class/{id}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  handleGet(req, res, 'SELECT * FROM class WHERE id = ?')
}
