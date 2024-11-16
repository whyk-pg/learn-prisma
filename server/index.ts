import { ulid } from "@std/ulid";
import { Hono } from "hono";
import { setupPrisma } from "../prisma";
const app = new Hono();

const BASE_PATH = "/api";

const routes = app
  .get(BASE_PATH, async (c) => {
    return c.text("Hello World!");
  })
  .get(`${BASE_PATH}/movie/:id`, async (c) => {
    const id = c.req.param("id");
    const prisma = setupPrisma();

    const movie = await prisma.movie.findFirst({
      where: {
        id,
      },
      include: {
        theater: {
          select: {
            name: true,
          },
        },
        createrCountry: {
          select: {
            name: true,
          },
        },
        movieFormat: {
          select: {
            name: true,
          },
        },
        screeningFormat: {
          select: {
            name: true,
          },
        },
      },
      cacheStrategy: {
        ttl: 60,
      },
    });

    if (!movie) {
      return c.json({ message: "No movie found" }, 404);
    }

    return c.json(movie);
  })
  .get(`${BASE_PATH}/movies`, async (c) => {
    const prisma = setupPrisma();

    const movies = await prisma.movie.findMany({
      include: {
        theater: {
          select: {
            name: true,
          },
        },
        createrCountry: {
          select: {
            name: true,
          },
        },
        movieFormat: {
          select: {
            name: true,
          },
        },
        screeningFormat: {
          select: {
            name: true,
          },
        },
      },
      cacheStrategy: {
        ttl: 60,
      },
    });

    return c.json(movies);
  })
  .post(`${BASE_PATH}/movie`, async (c) => {
    const body = await c.req.json<{
      title: string;
      isSubtitles: boolean;
      theaterId: string;
      createrCountryId: string;
      movieFormatId: string;
      screeningFormatId: string;
      viewStartDatetime: string;
      viewEndDatetime: string;
      companionsCount: number | null;
      rating: number | null;
      comment: string | null;
    }>();
    const prisma = setupPrisma();

    const movie = await prisma.movie.create({
      data: {
        id: ulid(),
        title: body.title,
        isSubtitles: body.isSubtitles,
        theaterId: body.theaterId,
        createrCountryId: body.createrCountryId,
        movieFormatId: body.movieFormatId,
        screeningFormatId: body.screeningFormatId,
        viewStartDatetime: new Date(body.viewStartDatetime),
        viewEndDatetime: new Date(body.viewEndDatetime),
        companionsCount: body.companionsCount,
        rating: body.rating,
        comment: body.comment,
      },
    });

    return c.json(movie);
  })
  .patch(`${BASE_PATH}/movie/:id`, async (c) => {
    const id = c.req.param("id");
    const prisma = setupPrisma();

    const sorceMovie = await prisma.movie.findFirst({
      where: {
        id,
      },
    });

    const movie = await prisma.movie.update({
      where: {
        moviePk: sorceMovie?.moviePk,
        id,
      },
      data: {
        title: "The Godfather",
      },
    });

    return c.json(movie);
  })
  .delete(`${BASE_PATH}/movie/:id`, async (c) => {
    const id = c.req.param("id");
    const prisma = setupPrisma();

    const sorceMovie = await prisma.movie.findFirst({
      where: {
        id,
      },
    });

    const movie = await prisma.movie.delete({
      where: {
        moviePk: sorceMovie?.moviePk,
        id,
      },
    });

    return c.json(movie);
  })
  .get(`${BASE_PATH}/theaters`, async (c) => {
    const prisma = setupPrisma();

    const theaters = await prisma.theater.findMany();

    return c.json(theaters);
  })
  .get(`${BASE_PATH}/creaters_countries`, async (c) => {
    const prisma = setupPrisma();

    const createrCountries = await prisma.createrCountry.findMany();

    return c.json(createrCountries);
  })
  .get(`${BASE_PATH}/movie_formats`, async (c) => {
    const prisma = setupPrisma();

    const movieFormats = await prisma.movieFormat.findMany();

    return c.json(movieFormats);
  })
  .get(`${BASE_PATH}/screening_formats`, async (c) => {
    const prisma = setupPrisma();

    const screeningFormats = await prisma.screeningFormat.findMany();

    return c.json(screeningFormats);
  });

export default app;
export type AppType = typeof routes;
