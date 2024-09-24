import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/class/index'
import { getDb } from '@/database'
import { getParams } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

// Mock the database and utility function
jest.mock('@/database')
jest.mock('@/utils')

describe('GET /api/class', () => {
  beforeEach(() => {
    // Clear any existing mocks before each test
    jest.clearAllMocks()
  })

  it('should return 200 and the class data when successful', async () => {
    const mockClasses = [
      {
        id: '1',
        course_id: '101',
        instructor_id: '501',
        semester: 'Fall',
        year: 2024,
      },
      {
        id: '2',
        course_id: '102',
        instructor_id: '502',
        semester: 'Spring',
        year: 2025,
      },
    ]

    // Mock getDb to return a db object with the "all" method
    ;(getDb as jest.Mock).mockResolvedValue({
      all: jest.fn().mockResolvedValue(mockClasses),
    })

    // Mock getParams to return a query and params
    ;(getParams as jest.Mock).mockReturnValue({
      params: [],
      newQuery: 'SELECT * FROM class',
    })

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>()

    // Add the required 'env' property to the 'req' object
    req.env = {}

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200) // Expect 200 status code
    const data = res._getJSONData()
    expect(data).toEqual(mockClasses) // Expect data to match mock classes
  })

  it('should return 500 when there is a database error', async () => {
    // Mock getDb to throw an error
    ;(getDb as jest.Mock).mockImplementation(() => {
      throw new Error('Database connection failed')
    })

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: {}, // No query parameters
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(500) // Expect 500 status code
    const responseData = res._getJSONData()
    expect(responseData).toEqual({ error: 'Failed to run migration' }) // Error response
  })

  it('should call getParams with the correct query and params', async () => {
    const mockQueryParams = { semester: 'Fall', year: 2024 }

    ;(getDb as jest.Mock).mockResolvedValue({
      all: jest.fn().mockResolvedValue([]), // Return empty array as mock result
    })

    const mockQueryResult = {
      params: ['Fall', 2024],
      newQuery: 'SELECT * FROM class WHERE semester = ? AND year = ?',
    }
    ;(getParams as jest.Mock).mockReturnValue(mockQueryResult)

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: mockQueryParams, // Simulate query parameters
    })

    await handler(req, res)

    // Ensure getParams is called with the correct SQL query and queryParams
    expect(getParams).toHaveBeenCalledWith(
      'SELECT * FROM class',
      mockQueryParams,
    )
  })
})
