import { getDb } from '@/database'
import { NextApiRequest, NextApiResponse } from 'next'

export const handleQuery = async (
  req: NextApiRequest,
  res: NextApiResponse,
  baseQuery: string,
) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method Not Allowed' })
    }

    const db = await getDb()
    const { query } = req
    const { params, newQuery } = getParams(baseQuery, query)

    const data = await db.all(newQuery, params)
    return res.status(200).json(data)
  } catch (error) {
    console.error('Error executing query:', error)
    return res.status(500).json({ error: 'Failed to fetch data' })
  }
}

const getParams = (
  query: string,
  queryParams: Partial<Record<string, string | string[]>>,
  hasWhere = false,
) => {
  // map query params to an array of conditions
  // e.g. conditions: [ "semester LIKE '%' || ? || '%'", "year LIKE '%' || ? || '%'" ]
  const conditions = Object.keys(queryParams).map(
    (key) => `${key} LIKE '%' || ? || '%'`,
  )

  // get the values of the query params as an array
  const params = Object.values(queryParams)

  // Generate the new query with the given conditions
  const newQuery =
    conditions.length > 0
      ? `${query} ${hasWhere ? 'AND' : 'WHERE'} ${conditions.join(' AND ')}`
      : query

  return { params, newQuery }
}
