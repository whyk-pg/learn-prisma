import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  await client.theater.create({
    data: {
      name: "Theater 1",
    },
  });
  await client.movie.create({
    data: {
      title: "The Shawshank Redemption",
      isDubbed: false,
      isDomestic: true,
      isLiveAction: true,
      theaterId: 1,
      viewStartDatetime: new Date("2022-01-01T00:00:00Z"),
      viewEndDatetime: new Date("2022-01-02T00:00:00Z"),
      rating: 2,
    },
  });
}

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
