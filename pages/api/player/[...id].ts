import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const playerId = req.query.id

  console.log({playerId})
  if (req.method === 'GET') {
    handleGET(playerId, res)
  } else if (req.method === 'DELETE') {
    handleDELETE(playerId, res)
  } else if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    handleUPDATE(playerId, res)
  }
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/player/:id
async function handleGET(playerId, res) {
  const player = await prisma.player.findUnique({
    where: { id: playerId },
  })
  res.json(player)
}

// DELETE /api/player/:id
async function handleDELETE(playerId, res) {
  const player = await prisma.player.delete({
    where: { id: playerId },
  })
  res.json(player)
}


// POST/PATCH/PUT /api/player/:id
async function handleUPDATE(playerId, res) {
  const player = await prisma.player.update({
    where: { id: playerId },
    data: {
    },
  })
  res.json(player)
}