import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { Button } from "./ui/button";

export default async function Queue() {
  const session = await auth();
  const queue = await prisma.queue.findMany({
    where: {
      userId: session?.user?.id!,
    },
  });

  return (
    <div className="border rounded-md shadow m-3 p-4 gap-3 flex flex-col ">
      <h3 className="text-xl font-bold">Queue</h3>
      <ul>
        {queue.map((song) => (
          <li className="border-b mb-1 flex py-2">
            <img src={song.thumbnail} className="w-36 h-fit rounded-md" />
            <div className="ml-3 flex flex-col items-start gap-1 truncate whitespace-nowrap overflow-hidden text-ellipsis">
              <h4 className="text-md font-semibold">{song.title}</h4>
              <span className="bg-secondary text-sm px-2 py-0 font-mono rounded-md">
                {song.seconds}
              </span>
              <Button variant="outline" size="sm">
                Play
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
