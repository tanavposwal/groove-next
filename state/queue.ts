import { atom } from 'recoil';
import { QueueItem } from '@/lib/db';

export const queueState = atom<QueueItem[]>({
  key: 'queueState',
  default: [],
});
