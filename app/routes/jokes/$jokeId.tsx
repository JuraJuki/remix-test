import { Joke } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

type LoaderData = { joke: Pick<Joke, "content"> | null };

export let loader: LoaderFunction = async ({ params }) => {
  let joke = await db.joke.findUnique({
    select: { content: true },
    where: { id: params.jokeId },
  });
  if (!joke) throw new Error("Joke not found");

  let data: LoaderData = { joke };

  return data;
};

export default function JokeRoute() {
  let data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke?.content}</p>
    </div>
  );
}
