import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function GET(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getServerSession(request, response, authOptions);

  if (!session)
    return response.status(401).json({ message: "Please sign in." });

  try {
    const data = await prisma.user.findUnique({
      where: {
        email: session.user?.email!,
      },
      include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            comments: true,
          },
        },
      },
    });

    response.status(200).json(data);
  } catch (error) {
    response.status(403).json(error);
  }
}
