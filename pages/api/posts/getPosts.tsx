import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function GET(
  _request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const data = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    response.status(200).json(data);
  } catch (error) {
    response.status(403).json(error);
  }
}
