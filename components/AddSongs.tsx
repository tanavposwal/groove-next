"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { addSongAction } from "@/actions/addsong";
import { Plus } from "lucide-react";

function getYouTubeVideoID(url: string): string | null {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function Adder({ userID }: { userID: string }) {
  const [url, setUrl] = useState<string | null>();

  const opts = {
    height: "225",
    width: "400",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      <h3 className="text-md font-bold py-4">Add to Queue</h3>
      <div className="h-24 w-full flex items-center justify-center my-2 border rounded">
        {url && (
          <div className="aspect-auto h-full w-fit">
            <img
              className="w-full h-full object-contain"
              src={`https://img.youtube.com/vi/${getYouTubeVideoID(
                url
              )}/hqdefault.jpg`}
              alt=""
            />
          </div>
        )}
      </div>
      <form className="flex flex-col gap-2" action={addSongAction}>
        <div className="relative flex-1">
          <Input
            placeholder="Paste yt link here"
            value={url!}
            name="url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <input type="text" defaultValue={userID} hidden name="userID" />
        <Button type="submit" variant={"secondary"}>
          <Plus size={15} />
          Add to Queue
        </Button>
      </form>
    </div>
  );
}
