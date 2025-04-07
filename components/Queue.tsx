import { auth } from '@/auth';
import { getUserQueue } from '@/lib/db';
import { Button } from './ui/button';
import Player from './Player';
import { Music2, ListMusic, Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import QueueControls from './QueueControls';
import { RecoilRoot } from 'recoil';
import QueueInitializer from './QueueInitializer';
import { cn } from '@/lib/utils';

async function QueueList({ userId }: { userId: string }) {
  const queue = await getUserQueue(userId);

  if (queue.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground bg-muted/50 rounded-lg">
        <Music2 className="mr-2 animate-pulse" />
        No songs in queue
      </div>
    );
  }

  return (
    <>
      <QueueInitializer initialQueue={queue} />
      <ul className="flex flex-col gap-3 w-full">
        {queue.map((song, index) => (
          <li
            className={cn(
              'flex h-20 transition-all duration-200 hover:bg-muted/50 rounded-lg p-2',
              'transform hover:scale-[1.02] hover:shadow-md'
            )}
            key={song.id}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeIn 0.5s ease-out forwards',
            }}
          >
            <img
              src={song.thumbnail}
              alt={song.title}
              className="rounded-xl shadow-md h-full aspect-video object-cover"
              loading="lazy"
            />
            <div className="ml-3 flex flex-col items-start sm:gap-1 gap-0 justify-between w-full">
              <h4 className="sm:text-sm text-xs h-36 w-full whitespace-pre-wrap truncate select-none font-medium">
                {song.title}
              </h4>
              <Player id={song.ytid} userId={userId} />
            </div>
          </li>
        ))}
      </ul>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

function QueueLoading() {
  return (
    <div className="flex items-center justify-center h-32 bg-muted/50 rounded-lg">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
}

export default async function Queue() {
  const session = await auth();
  const userId = session?.user?.id!;

  return (
    <div className="gap-3 flex flex-col">
      <div className="flex gap-2 justify-between mb-1 items-center py-3 border-b">
        <div className="flex gap-2 font-bold text-lg">
          <ListMusic className="text-primary" />
          Queue
        </div>
        <RecoilRoot>
          <QueueControls />
        </RecoilRoot>
      </div>
      <Suspense fallback={<QueueLoading />}>
        <QueueList userId={userId} />
      </Suspense>
    </div>
  );
}
