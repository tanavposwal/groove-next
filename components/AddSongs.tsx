"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import YouTube from "react-youtube";
import { addSongAction } from "@/actions/addsong";

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
    <div className="border rounded-md shadow ml-0 p-4 gap-4 flex flex-col h-fit w-fit">
      <h3 className="text-xl font-bold">Add Songs</h3>
      <div>
        <form className="flex gap-2" action={addSongAction}>
          <Input
            placeholder="Paste yt link here"
            value={url!}
            name="url"
            onChange={(e) => setUrl(e.target.value)}
          />
          <input type="text" defaultValue={userID} hidden name="userID" />
          <Button type="submit">Add to Queue</Button>
        </form>
      </div>
      {url && (
        <div className="rounded-lg overflow-hidden w-fit border">
          <img className="h-40" src={`https://img.youtube.com/vi/${getYouTubeVideoID(url)}/hqdefault.jpg`} alt="" />
        </div>
      )}
    </div>
  );
}
