import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const setupPrisma = () => {
  return new PrismaClient().$extends(withAccelerate());
};
