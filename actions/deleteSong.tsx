"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteSong(formData: FormData) {
  const idSong = formData.get("id") as string;
  const userId = formData.get("userId") as string;

  await prisma.queue.deleteMany({
    where: {
      userId,
      ytid: idSong,
    },
  });
  console.log("delete", idSong, userId)

  revalidatePath("/dashboard");
}
