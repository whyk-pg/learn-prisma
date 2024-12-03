import type { MetaFunction } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { hc } from "hono/client";
import type { AppType } from "../../server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const client = hc<AppType>("http://localhost:5173");
  const moviesResponse = await client.api.movies.$get();
  const movies = await moviesResponse.json();
  const theatersResponse = await client.api.theaters.$get();
  const theaters = await theatersResponse.json();
  const creatersCountriesResponse = await client.api.creaters_countries.$get();
  const creatersCountries = await creatersCountriesResponse.json();
  const screeningFormatsResponse = await client.api.screening_formats.$get();
  const screeningFormats = await screeningFormatsResponse.json();
  const movieFormatsResponse = await client.api.movie_formats.$get();
  const movieFormats = await movieFormatsResponse.json();
  return {
    movies,
    theaters,
    creatersCountries,
    screeningFormats,
    movieFormats,
  };
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <section>
        <h2 className="text-2xl font-bold underline">Movies</h2>
        <ul>
          {data.movies.map((movie) => (
            <li key={movie.id}>
              {movie.title}({movie.id})、{movie.theater.name}({movie.theaterId}
              )、{movie.createrCountry.name}({movie.createrCountryId})、
              {movie.screeningFormat.name}({movie.screeningFormatId})、
              {movie.movieFormat.name}({movie.movieFormatId})
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold underline">Theaters</h2>
        <ul>
          {data.theaters.map((theater) => (
            <li key={theater.id}>
              {theater.name}({theater.id})
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold underline">Creaters Countries</h2>
        <ul>
          {data.creatersCountries.map((createrCountry) => (
            <li key={createrCountry.id}>
              {createrCountry.name}({createrCountry.id})
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold underline">Screening Formats</h2>
        <ul>
          {data.screeningFormats.map((screeningFormat) => (
            <li key={screeningFormat.id}>
              {screeningFormat.name}({screeningFormat.id})
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold underline">Movie Formats</h2>
        <ul>
          {data.movieFormats.map((movieFormat) => (
            <li key={movieFormat.id}>
              {movieFormat.name}({movieFormat.id})
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold underline">Update test</h2>
        <Form method="PATCH" action="/update">
          <input type="text" name="title" defaultValue="test" />
          <button type="submit">Update</button>
        </Form>
      </section>
    </>
  );
}
