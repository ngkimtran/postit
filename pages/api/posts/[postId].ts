import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function GET(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const postId = Array.isArray(request.query?.postId)
      ? request.query?.postId[0]
      : request.query?.postId;

    const data = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
          },
        },
      },
    });
    response.status(200).json(data);
  } catch (error) {
    response.status(403).json(error);
  }
}
