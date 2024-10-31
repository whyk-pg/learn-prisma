import { PrismaClient } from "@prisma/client";
import { PrismaTiDBCloud } from "@tidbcloud/prisma-adapter";
import { connect } from "@tidbcloud/serverless";

export const setupPrisma = (url: string) => {
  const connection = connect({ url });
  const adapter = new PrismaTiDBCloud(connection);
  return new PrismaClient({ adapter });
};
