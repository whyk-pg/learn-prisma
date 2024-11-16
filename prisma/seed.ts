import { PrismaClient } from "@prisma/client";
import { ulid } from "@std/ulid";

const client = new PrismaClient();

const theaterId = ulid();
const createrCountryId = ulid();
const movieFormatId = ulid();
const screeningFormatId = ulid();

async function main() {
  await client.theater.create({
    data: {
      id: theaterId,
      name: "Theater 1",
    },
  });
  await client.createrCountry.create({
    data: {
      id: createrCountryId,
      name: "アメリカ合衆国",
    },
  });
  await client.movieFormat.create({
    data: {
      id: movieFormatId,
      name: "2Dアニメーション",
    },
  });
  await client.screeningFormat.create({
    data: {
      id: screeningFormatId,
      name: "IMAX",
    },
  });
  await client.movie.create({
    data: {
      id: ulid(),
      title: "The Shawshank Redemption",
      isSubtitles: true,
      theaterId,
      createrCountryId,
      movieFormatId,
      screeningFormatId,
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
