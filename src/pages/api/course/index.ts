import { handleQuery } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return handleQuery(req, res, 'SELECT * FROM course')
}
