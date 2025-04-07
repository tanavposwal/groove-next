'use client';

import { Button } from './ui/button';
import { PlayCircle, Shuffle, RefreshCw } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { queueState } from '@/state/queue';
import { QueueItem } from '@/lib/db';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function QueueControls() {
  const [queue, setQueue] = useRecoilState(queueState);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handlePlay = () => {
    if (queue.length > 0) {
      // Play the first song in the queue
      const firstSong = queue[0];
      // You can implement your play logic here
      console.log('Playing:', firstSong.title);
    }
  };

  const handleShuffle = () => {
    if (queue.length > 0) {
      setIsShuffling(true);
      // Create a copy of the queue and shuffle it
      const shuffledQueue = [...queue];
      for (let i = shuffledQueue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQueue[i], shuffledQueue[j]] = [shuffledQueue[j], shuffledQueue[i]];
      }
      setQueue(shuffledQueue);
      setTimeout(() => setIsShuffling(false), 500);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Refresh the queue by revalidating the page
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePlay}
        disabled={queue.length === 0}
        className={cn(
          'transition-all duration-200 hover:scale-110',
          queue.length === 0 && 'opacity-50 cursor-not-allowed'
        )}
      >
        <PlayCircle size={20} className="text-primary" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleShuffle}
        disabled={queue.length === 0 || isShuffling}
        className={cn(
          'transition-all duration-200 hover:scale-110',
          (queue.length === 0 || isShuffling) && 'opacity-50 cursor-not-allowed',
          isShuffling && 'animate-spin'
        )}
      >
        <Shuffle size={20} className={cn('text-primary', isShuffling && 'animate-pulse')} />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleRefresh}
        disabled={isRefreshing}
        className={cn(
          'transition-all duration-200 hover:scale-110',
          isRefreshing && 'opacity-50 cursor-not-allowed'
        )}
      >
        <RefreshCw size={20} className={cn('text-primary', isRefreshing && 'animate-spin')} />
      </Button>
    </div>
  );
}
