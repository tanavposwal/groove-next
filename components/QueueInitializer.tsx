'use client';

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { queueState } from '@/state/queue';
import { QueueItem } from '@/lib/db';

interface QueueInitializerProps {
  initialQueue: QueueItem[];
}

export default function QueueInitializer({ initialQueue }: QueueInitializerProps) {
  const setQueue = useSetRecoilState(queueState);

  useEffect(() => {
    setQueue(initialQueue);
  }, [initialQueue, setQueue]);

  return null;
}
