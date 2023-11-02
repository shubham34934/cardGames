import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.id

  console.log({userId})
  if (req.method === 'GET') {
    handleGET(userId, res)
  } else if (req.method === 'DELETE') {
    handleDELETE(userId, res)
  } else if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    handleUPDATE(userId, res)
  }
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/user/:id
async function handleGET(userId, res) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })
  res.json(user)
}

// DELETE /api/user/:id
async function handleDELETE(userId, res) {
  const user = await prisma.user.delete({
    where: { id: userId },
  })
  res.json(user)
}


// POST/PATCH/PUT /api/user/:id
async function handleUPDATE(userId, res) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
    },
  })
  res.json(user)
}