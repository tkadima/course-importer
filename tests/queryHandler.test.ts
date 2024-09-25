import { handleQuery } from '@/utils'
import { getDb } from '@/database'
import { NextApiRequest, NextApiResponse } from 'next'

jest.mock('@/database') // Mocking the getDb function

describe('handleQuery', () => {
  let req: Partial<NextApiRequest>
  let res: Partial<NextApiResponse>
  let json: jest.Mock
  let status: jest.Mock

  beforeEach(() => {
    json = jest.fn()
    status = jest.fn().mockReturnValue({ json })
    req = {}
    res = { status }
  })

  it('should return 200 and data when method is GET', async () => {
    const mockData = [{ id: 1, name: 'John Doe' }]
    const db = { all: jest.fn().mockResolvedValue(mockData) }
    ;(getDb as jest.Mock).mockResolvedValue(db)

    req.method = 'GET'
    req.query = { name: 'John' }

    await handleQuery(
      req as NextApiRequest,
      res as NextApiResponse,
      'SELECT * FROM student',
    )

    expect(getDb).toHaveBeenCalled()
    expect(db.all).toHaveBeenCalledWith(expect.any(String), expect.any(Array))
    expect(status).toHaveBeenCalledWith(200)
    expect(json).toHaveBeenCalledWith(mockData)
  })

  it('should return 405 when method is not GET', async () => {
    req.method = 'POST'

    await handleQuery(
      req as NextApiRequest,
      res as NextApiResponse,
      'SELECT * FROM student',
    )

    expect(status).toHaveBeenCalledWith(405)
    expect(json).toHaveBeenCalledWith({ error: 'Method Not Allowed' })
  })

  it('should return 500 when there is a database error', async () => {
    const db = { all: jest.fn().mockRejectedValue(new Error('DB error')) }
    ;(getDb as jest.Mock).mockResolvedValue(db)

    req.method = 'GET'
    req.query = {}

    await handleQuery(
      req as NextApiRequest,
      res as NextApiResponse,
      'SELECT * FROM student',
    )

    expect(getDb).toHaveBeenCalled()
    expect(status).toHaveBeenCalledWith(500)
    expect(json).toHaveBeenCalledWith({ error: 'Failed to fetch data' })
  })
})
