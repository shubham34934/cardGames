import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    handleGET(res)
  } else if (req.method === 'POST') {
    handleCREATE(req,res)
  }
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/game/:id
async function handleGET(res) {
  const games = await prisma.game.findMany({
      include: {
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
  res.json(games);
}

// DELETE /api/game/:id
async function handleCREATE(req, res) {
  const game = await prisma.game.create({
    data: {
      ...req.body
    },
  })
  console.log({game})
  res.json(game)
}

