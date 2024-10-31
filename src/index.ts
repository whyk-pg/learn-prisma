import { Hono } from "hono";
import { setupPrisma } from "../prisma";
const app = new Hono<{ Bindings: { DATABASE_URL: string } }>();

app.get("/", async (c) => {
  return c.text("Hello World!");
});

app.get("/movie/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = setupPrisma(c.env.DATABASE_URL);

  const movie = await prisma.movie.findFirst({
    where: {
      id: Number.parseInt(id),
    },
    include: {
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
  });

  if (!movie) {
    return c.json({ message: "No movie found" }, 404);
  }

  return c.json(movie);
});

app.get("/movie", async (c) => {
  const prisma = setupPrisma(c.env.DATABASE_URL);

  const movies = await prisma.movie.findMany({
    include: {
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
  });

  if (!movies) {
    return c.json({ message: "No movie found" }, 404);
  }

  return c.json(movies);
});

app.post("/movie", async (c) => {
  const body = await c.req.json<{
    title: string;
    isSubtitles: boolean;
    theaterId: number;
    createrCountryId: number;
    movieFormatId: number;
    screeningFormatId: number;
    viewStartDatetime: string;
    viewEndDatetime: string;
    companionsCount: number | null;
    rating: number | null;
    comment: string | null;
  }>();
  const prisma = setupPrisma(c.env.DATABASE_URL);

  const movie = await prisma.movie.create({
    data: {
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
});

app.patch("/movie/:id", async (c) => {
  const prisma = setupPrisma(c.env.DATABASE_URL);

  const movie = await prisma.movie.update({
    where: {
      id: 1,
    },
    data: {
      title: "The Godfather",
    },
  });

  return c.json(movie);
});

app.delete("/movie/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = setupPrisma(c.env.DATABASE_URL);

  const movie = await prisma.movie.delete({
    where: {
      id: Number.parseInt(id),
    },
  });

  return c.json(movie);
});

export default app;
