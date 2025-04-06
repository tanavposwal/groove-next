import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { Button } from "./ui/button";
import Player from "./Player";
import {
  PlayCircle,
  Shuffle,
  RefreshCw,
  Music2,
  Music,
  Repeat,
  ListMusic,
} from "lucide-react";

export default async function Queue() {
  const session = await auth();
  const queue = await prisma.queue.findMany({
    where: {
      userId: session?.user?.id!,
    },
  });

  return (
    <div className="gap-3 flex flex-col">
      <div className="flex gap-2 justify-between mb-1 items-center py-3">
        <div className="flex gap-2 font-bold">
          <ListMusic />
          Queue
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <PlayCircle size={20} />
          </Button>
          <Button variant="outline" size="icon">
            <Shuffle size={20} />
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw size={20} />
          </Button>
        </div>
      </div>
      <ul className="flex flex-col gap-3 w-full">
        {queue.map((song) => (
          <li className="flex h-20" key={song.id}>
            <img
              src={song.thumbnail}
              className="rounded-md border h-full aspect-video"
            />
            <div className="ml-3 flex flex-col items-start sm:gap-1 gap-0 justify-between">
              <h4 className="sm:text-sm text-xs h-36 w-full whitespace-pre-wrap truncate select-none">
                {song.title}
              </h4>
              <Player id={song.ytid} userId={session?.user?.id!} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
