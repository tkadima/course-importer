import { getDb } from '@/database'
import { getParams } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const db = await getDb()

    if (req.method === 'GET') {
      const queryParams = req.query

      let { params, newQuery } = getParams('SELECT * FROM course', queryParams)
      const data = await db.all(newQuery, params)

      res.status(200).json(data)
    }
  } catch (error) {
    console.error('Failed to run query:', error)
    res.status(500).json({ error: 'Failed to run query' })
  }
}
