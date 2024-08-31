"use server";

import { prisma } from "@/prisma";
// @ts-ignore
import youtubesearchapi from "youtube-search-api";

function getYouTubeVideoID(url: string): string | null {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export async function addSongAction(formData: FormData) {
    const res = await youtubesearchapi.GetVideoDetails(getYouTubeVideoID(formData.get("url") as string));
    const thumbnails = res.thumbnail.thumbnails;
    await prisma.queue.create({
        data: {
        url: formData.get("url") as string,
        userId: formData.get("userID") as string,
        ytid: getYouTubeVideoID(formData.get("url") as string)!,
        title: res.title,
        thumbnail: thumbnails[thumbnails.length - 1].url,
        seconds: 0,
        },
    });
}
