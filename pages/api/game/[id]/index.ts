import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const gameId = req.query.id

  if (req.method === 'GET') {
    handleGET(gameId, res)
  } else if (req.method === 'DELETE') {
    handleDELETE(gameId, res)
  } else if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    handleUPDATE(gameId, res)
  }
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/game/:id
async function handleGET(gameId, res) {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      turns:true,
      players: {
        include: {
          user: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })
  res.json(game)
}


// DELETE /api/game/:id
async function handleDELETE(gameId, res) {
  const game = await prisma.game.delete({
    where: { id: gameId },
  })
  res.json(game)
}


// POST/PATCH/PUT /api/game/:id
async function handleUPDATE(gameId, res) {
  const game = await prisma.game.update({
    where: { id: gameId },
    data: {
    },
  })
  res.json(game)
}