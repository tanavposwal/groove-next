import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { Button } from "./ui/button";
import Player from "./Player";

export default async function Queue() {
  const session = await auth();
  const queue = await prisma.queue.findMany({
    where: {
      userId: session?.user?.id!,
    },
  });

  return (
    <div className="border rounded-md shadow p-4 gap-3 flex flex-col ">
      <div className="flex justify-between border-b pb-3 mb-1 items-center">
      <h3 className="text-xl font-bold">Queue</h3>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Play All</Button>
        <Button variant="outline" size="sm">Shuffle</Button>
      </div>
      </div>
      <ul className="flex flex-col gap-3">
        {queue.map((song) => (
          <li className="flex h-20">
            <img src={song.thumbnail} className="h-full rounded-md border" />
            <div className="ml-3 flex flex-col items-start gap-1 justify-between">
              <h4 className="text-sm font-semibold">{song.title}</h4>
              <Player id={song.ytid} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
