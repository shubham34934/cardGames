import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

// POST /api/user
// Required fields in body: name, email
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Handle the POST request to create a new user
    const result = await prisma.user.create({
      data: {
        ...req.body,
      },
    });
    res.json(result);
  } else if (req.method === 'GET') {
    // Handle the GET request to fetch all users
    const users = await prisma.user.findMany();
    res.json(users);
  } else {
    // Handle other HTTP methods if needed
    res.status(405).json({ message: 'Method not allowed' });
  }
}
