import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // handleGET(turnId, res)
  } else if (req.method === 'DELETE') {
    // handleDELETE(turnId, res)
  } else if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    handleCREATE(req,res)
  }
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/turn/:id
async function handleGET(turnId, res) {
  const turn = await prisma.turn.findUnique({
    where: { id: turnId },
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
  res.json(turn)
}


// DELETE /api/turn/:id
async function handleDELETE(turnId, res) {
  const turn = await prisma.turn.delete({
    where: { id: turnId },
  })
  res.json(turn)
}


// POST/PATCH/PUT /api/turn/:id
async function handleCREATE(req, res) {
  const turn = await prisma.turn.create({
    data: {
      ...req.body
    },
  })
  res.json(turn)
}