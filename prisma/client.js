import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
