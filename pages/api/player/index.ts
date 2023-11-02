import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    handleGET(req,res)
  } else if (req.method === 'POST') {
    handleCREATE(req,res)
  }
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/player/:id
async function handleGET(req, res) {
  const { ids } = req.query; 
  const playerIds = ids.split(",");
  try {
    const players = await prisma.player.findMany({
      where: {
        id: {
          in: playerIds,
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch players.' });
  }
}

// DELETE /api/player/:id
async function handleCREATE(req, res) {
  const { userId } = req.body;
  if (Array.isArray(userId)) {
    try {
      const createdPlayers = await Promise.all(
        userId.map(async (playerData) => {
          const player = await prisma.player.create({
            data: {userId:playerData},
          });
          return player;
        })
      );
      res.status(201).json(createdPlayers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create players.' });
    }
  } else if (typeof userId === 'string') {
    try {
      const player = await prisma.player.create({
        data:{userId},
      });
      res.status(201).json(player);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create a player.' });
    }
  } else {
    res.status(400).json({ error: 'Invalid request. Expected an array or a player object.' });
  }
}

