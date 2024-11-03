import type { MetaFunction } from "@remix-run/cloudflare";
import type { AppType } from "../../server";
import {hc} from 'hono/client';
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const client = hc<AppType>('http://localhost:5173');
  const res = await client.api.movie.$get();
  const movies = await res.json();
  return movies;
}

export default function Index() {
  const movies = useLoaderData<typeof loader>();

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <h1 className="text-3xl font-bold underline">Hello World</h1>
        <ul>
        {movies.map((movie) => (<li key={movie.id}>{movie.title}</li>))}
        </ul>
      </body>
    </html>
  );
}
