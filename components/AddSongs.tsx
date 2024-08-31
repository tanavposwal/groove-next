"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import YouTube from "react-youtube";

function getYouTubeVideoID(url: string): string | null {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function Adder() {
  const [url, setUrl] = useState<string | null>();

  const opts = {
    height: "180",
    width: "320",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="border rounded-md shadow m-3 p-4 gap-4 flex flex-col">
      <h3 className="text-lg font-bold">Add Songs</h3>
      <div className="flex gap-2">
        <Input
          placeholder="Paste yt link here"
          value={url!}
          onChange={(e) => setUrl(e.target.value)}
        />
        {/* add this song to user queue */}
        <Button>Add to Queue</Button>
      </div>
      {url && (
        <div className="rounded-lg overflow-hidden w-fit">
          <YouTube videoId={getYouTubeVideoID(url)} opts={opts} />
        </div>
      )}
    </div>
  );
}
