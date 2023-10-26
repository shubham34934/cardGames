import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}

// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, authorEmail } = req.body

  // Validate email format
  if (!isValidEmail(authorEmail)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(result)
}
