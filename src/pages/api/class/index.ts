import { handleQuery } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

// Gets all class data
// filters by query parameters
// e.g. localhost:3000/api/class
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return handleQuery(req, res, 'SELECT * FROM class')
}
