import { handleGet } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  handleGet(req, res, 'SELECT * FROM class WHERE id = ?')
}
