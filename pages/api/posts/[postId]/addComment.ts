import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "../../../../prisma/client";

export default async function POST(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getServerSession(request, response, authOptions);

  if (!session)
    return response
      .status(401)
      .json({ message: "Please sign in to make a comment." });

  const { content, postId } = request.body?.data;
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! }, // ! indicates non-null assertion operation
  });

  if (content.length > 300)
    return response
      .status(403)
      .json({ message: "Please write a shorter comment." });
  if (!content.length)
    return response
      .status(403)
      .json({ message: "Please do not leave this empty." });

  try {
    const result = await prisma.comment.create({
      data: {
        content,
        userId: user?.id!,
        postId: postId,
      },
    });
    response.status(200).json(result);
  } catch (error) {
    response.status(403).json(error);
  }
}
