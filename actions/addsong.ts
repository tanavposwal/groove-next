"use server";

import { addToQueue } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
// @ts-ignore
import youtubesearchapi from "youtube-search-api";

const youtubeUrlSchema = z.string().url().refine((url) => {
  const videoId = getYouTubeVideoID(url);
  return videoId !== null;
}, "Invalid YouTube URL");

function getYouTubeVideoID(url: string): string | null {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export async function addSongAction(formData: FormData) {
  try {
    const url = formData.get("url") as string;
    const userId = formData.get("userID") as string;

    // Validate input
    const validationResult = youtubeUrlSchema.safeParse(url);
    if (!validationResult.success) {
      throw new Error("Invalid YouTube URL");
    }

    if (!userId) {
      throw new Error("User ID is required");
    }

    const videoId = getYouTubeVideoID(url)!;
    
    // Get video details
    const videoDetails = await youtubesearchapi.GetVideoDetails(videoId);
    if (!videoDetails || !videoDetails.thumbnail) {
      throw new Error("Failed to fetch video details");
    }

    const thumbnails = videoDetails.thumbnail.thumbnails;
    const thumbnailUrl = thumbnails[thumbnails.length - 1].url;

    // Add to queue using the service layer
    await addToQueue({
      url,
      userId,
      ytid: videoId,
      title: videoDetails.title,
      thumbnail: thumbnailUrl,
      seconds: 0,
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error adding song:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to add song' 
    };
  }
}
