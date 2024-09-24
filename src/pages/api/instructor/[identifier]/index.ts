import { handleGet } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return handleGet(req, res, 'SELECT * FROM instructor WHERE id = ?')
}
