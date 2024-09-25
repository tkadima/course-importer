import { getDb } from '@/database'
import { NextApiRequest, NextApiResponse } from 'next'

export const handleGet = async (
  req: NextApiRequest,
  res: NextApiResponse,
  baseQuery: string,
) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method Not Allowed' })
    }

    const db = await getDb()
    const { identifier } = req.query

    const data = await db.get(baseQuery, identifier)

    if (!data) {
      return res.status(404).json({ error: 'Record not found' })
    }

    return res.status(200).json(data)
  } catch (error: any) {
    console.error(`Error executing query in handleGet: ${error.message}`, {
      error,
      baseQuery,
    })
    return res.status(500).json({ error: 'Internal server error' })
  }
}

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

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No records found' })
    }

    return res.status(200).json(data)
  } catch (error: any) {
    console.error(`Error executing query in handleQuery: ${error.message}`, {
      error,
      baseQuery,
      queryParams: req.query,
    })
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const handleDynamicQuery = async (
  req: NextApiRequest,
  res: NextApiResponse,
  baseQuery: string,
) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method Not Allowed' })
    }
    const { identifier, ...otherParams } = req.query

    if (!identifier) {
      return res.status(400).json({ error: 'Missing identifier in request' })
    }

    const db = await getDb()
    const { params, newQuery } = getParams(baseQuery, otherParams, true)

    const data = await db.all(newQuery, [identifier, ...params])

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No records found' })
    }

    return res.status(200).json(data)
  } catch (error: any) {
    console.error(
      `Error executing dynamic query in handleDynamicQuery: ${error.message}`,
      {
        error,
        baseQuery,
      },
    )
    return res.status(500).json({ error: 'Internal server error' })
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
