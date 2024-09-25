// import { handleDynamicQuery } from '../src/utils';
// import { getDb } from '@/database';
// import { NextApiRequest, NextApiResponse } from 'next';

// jest.mock('@/database'); // Mocking the getDb function
// jest.mock('@/utils', () => ({
//   getParams: jest.fn(), // Ensure getParams is mocked correctly
// }));

// console.log(handleDynamicQuery);

// describe('handleDynamicQuery', () => {
//   let req: Partial<NextApiRequest>;
//   let res: Partial<NextApiResponse>;
//   let json: jest.Mock;
//   let status: jest.Mock;

//   beforeEach(() => {
//     json = jest.fn();
//     status = jest.fn().mockReturnValue({ json });
//     req = {};
//     res = { status };
//   });

//   it('should return 200 and data for a successful GET request with class ID filtering', async () => {
//     const mockData = [
//       { student_id: 1, name: 'John Doe', grade: 'A', class_id: 1 },
//       { student_id: 2, name: 'Jane Smith', grade: 'B', class_id: 1 }
//     ];

//     const db = { all: jest.fn().mockResolvedValue(mockData) };
//     (getDb as jest.Mock).mockResolvedValue(db);

//     req.method = 'GET';
//     req.query = { identifier: '1', name: 'John' };

//     const baseQuery = 'SELECT student.*, grade FROM student JOIN enrollment ON student.id = enrollment.student_id WHERE class_id = ?';
//     const mockParams = { params: ['John'], newQuery: baseQuery + ' AND name LIKE \'%\' || ? || \'%\'' };

//     const { getParams } = require('@/utils');
//     getParams.mockReturnValue(mockParams);

//     await handleDynamicQuery(req as NextApiRequest, res as NextApiResponse, baseQuery);

//     expect(getDb).toHaveBeenCalled();
//     expect(getParams).toHaveBeenCalledWith(baseQuery, { name: 'John' }, true);
//     expect(db.all).toHaveBeenCalledWith(mockParams.newQuery, ['1', 'John']);
//     expect(status).toHaveBeenCalledWith(200);
//     expect(json).toHaveBeenCalledWith(mockData);
//   });

//   it('should return 405 when method is not GET', async () => {
//     req.method = 'POST';

//     await handleDynamicQuery(req as NextApiRequest, res as NextApiResponse, 'SELECT * FROM student');

//     expect(status).toHaveBeenCalledWith(405);
//     expect(json).toHaveBeenCalledWith({ error: 'Method Not Allowed' });
//   });

//   it('should return 500 when the database throws an error', async () => {
//     const db = { all: jest.fn().mockRejectedValue(new Error('DB error')) };
//     (getDb as jest.Mock).mockResolvedValue(db);

//     req.method = 'GET';
//     req.query = { identifier: '1' };

//     await handleDynamicQuery(req as NextApiRequest, res as NextApiResponse, 'SELECT * FROM student');

//     expect(status).toHaveBeenCalledWith(500);
//     expect(json).toHaveBeenCalledWith({ error: 'Failed to fetch data' });
//   });
// });
