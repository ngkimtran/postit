import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function DELETE(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getServerSession(request, response, authOptions);

  if (!session)
    return response
      .status(401)
      .json({ message: "Please sign in to delete a post." });

  try {
    const postId: string = request.body;
    const result = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    response.status(200).json(result);
  } catch (error) {
    response.status(403).json(error);
  }
}
