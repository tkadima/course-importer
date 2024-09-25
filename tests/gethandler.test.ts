import { handleGet } from '@/utils'
import { getDb } from '@/database'
import { NextApiRequest, NextApiResponse } from 'next'

jest.mock('@/database')

describe('handleGet', () => {
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
    const mockData = { id: 1, name: 'John Doe' }
    const db = { get: jest.fn().mockResolvedValue(mockData) }
    ;(getDb as jest.Mock).mockResolvedValue(db)

    req.method = 'GET'
    req.query = { identifier: '1' }

    await handleGet(
      req as NextApiRequest,
      res as NextApiResponse,
      'SELECT * FROM student WHERE id = ?',
    )

    expect(getDb).toHaveBeenCalled()
    expect(db.get).toHaveBeenCalledWith(
      'SELECT * FROM student WHERE id = ?',
      '1',
    )
    expect(status).toHaveBeenCalledWith(200)
    expect(json).toHaveBeenCalledWith(mockData)
  })

  it('should return 404 when no records are found', async () => {
    const db = { get: jest.fn().mockResolvedValue(undefined) }
    ;(getDb as jest.Mock).mockResolvedValue(db)

    req.method = 'GET'
    req.query = { identifier: '1' }

    await handleGet(
      req as NextApiRequest,
      res as NextApiResponse,
      'SELECT * FROM student WHERE id = ?',
    )

    expect(getDb).toHaveBeenCalled()
    expect(status).toHaveBeenCalledWith(404)
    expect(json).toHaveBeenCalledWith({ error: 'Record not found' })
  })

  it('should return 405 when method is not GET', async () => {
    req.method = 'POST' // Not allowed method

    await handleGet(
      req as NextApiRequest,
      res as NextApiResponse,
      'SELECT * FROM student WHERE id = ?',
    )

    expect(status).toHaveBeenCalledWith(405)
    expect(json).toHaveBeenCalledWith({ error: 'Method Not Allowed' })
  })

  it('should return 500 when there is a database error', async () => {
    const db = { get: jest.fn().mockRejectedValue(new Error('DB error')) }
    ;(getDb as jest.Mock).mockResolvedValue(db)

    req.method = 'GET'
    req.query = { identifier: '1' }

    await handleGet(
      req as NextApiRequest,
      res as NextApiResponse,
      'SELECT * FROM student WHERE id = ?',
    )

    expect(getDb).toHaveBeenCalled()
    expect(status).toHaveBeenCalledWith(500)
    expect(json).toHaveBeenCalledWith({ error: 'Internal server error' })
  })
})
