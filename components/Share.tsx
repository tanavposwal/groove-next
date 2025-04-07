"use client";

import { Button } from "./ui/button";
import { addSongAction } from "@/actions/addsong";
import { useSession } from "next-auth/react";
import { ShareIcon } from "lucide-react";

export default function Share() {
  const { data: session } = useSession();

  return (
    <div>
      <h3 className="text-md font-bold py-4">Share your queue</h3>

      <form className="flex flex-col gap-2" action={addSongAction}>
        <div className="relative flex-1"></div>
        <Button
          type="submit"
          variant={"secondary"}
          onClick={() =>
            navigator.clipboard.writeText(
              window.location.origin + session?.user?.id
            )
          }>
          <ShareIcon size={15} className="mr-2" />
          Copy Share Link
        </Button>
      </form>
    </div>
  );
}
