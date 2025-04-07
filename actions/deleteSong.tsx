"use server";

import { deleteFromQueue } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const deleteSongSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
});

export default async function deleteSong(formData: FormData) {
  try {
    const data = {
      id: formData.get("id") as string,
      userId: formData.get("userId") as string,
    };

    // Validate input
    const validationResult = deleteSongSchema.safeParse(data);
    if (!validationResult.success) {
      throw new Error("Invalid input data");
    }

    // Delete from queue using the service layer
    await deleteFromQueue(data.id, data.userId);
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting song:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete song' 
    };
  }
}
