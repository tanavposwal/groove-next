import { prisma } from '@/prisma';
import { cache } from 'react';

export interface QueueItem {
  id: string;
  url: string;
  title: string;
  ytid: string;
  thumbnail: string;
  seconds: number;
  userId: string;
}

// Cache the user's queue for 30 seconds
export const getUserQueue = cache(async (userId: string): Promise<QueueItem[]> => {
  return prisma.queue.findMany({
    where: { userId },
    orderBy: { id: 'desc' },
    select: {
      id: true,
      url: true,
      title: true,
      ytid: true,
      thumbnail: true,
      seconds: true,
      userId: true,
    },
  });
});

export const addToQueue = async (data: Omit<QueueItem, 'id'>) => {
  return prisma.queue.create({
    data,
    select: {
      id: true,
      url: true,
      title: true,
      ytid: true,
      thumbnail: true,
      seconds: true,
      userId: true,
    },
  });
};

export const deleteFromQueue = async (ytid: string, userId: string) => {
  return prisma.queue.deleteMany({
    where: {
      userId,
      ytid,
    },
  });
};

export const getQueueItem = cache(async (ytid: string, userId: string) => {
  return prisma.queue.findFirst({
    where: {
      userId,
      ytid,
    },
    select: {
      id: true,
      url: true,
      title: true,
      ytid: true,
      thumbnail: true,
      seconds: true,
      userId: true,
    },
  });
});
