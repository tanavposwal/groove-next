"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { addSongAction } from "@/actions/addsong";
import { ChevronUpIcon } from "lucide-react";

function getYouTubeVideoID(url: string): string | null {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function Adder({ userID }: { userID: string }) {
  const [url, setUrl] = useState<string | null>();
  const [open, setOpen] = useState(false);

  const opts = {
    height: "225",
    width: "400",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="border rounded-md shadow ml-0 p-4 gap-4 flex flex-col h-fit min-w-64">
      <div className="flex w-full justify-between items-center">
        <h3 className="text-xl font-bold">Add Songs</h3>
        <Button
          className="group"
          variant="ghost"
          size="icon"
          onClick={() => {
            setOpen(!open);
          }}>
          <ChevronUpIcon
            className={
              (open ? "rotate-180" : "rotate-0") +
              " opacity-60 group-hover:opacity-100 transition-all"
            }
          />
        </Button>
      </div>
      {open && (
        <div>
          <div>
            <form className="flex gap-2" action={addSongAction}>
              <div className="relative flex-1">
                <Input
                  placeholder="Paste yt link here"
                  value={url!}
                  name="url"
                  onChange={(e) => setUrl(e.target.value)}
                />
                {url && (
                  <div className="aspect-auto absolute top-0 right-0 bottom-0 z-50">
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
              <input type="text" defaultValue={userID} hidden name="userID" />
              <Button type="submit" onClick={() => setOpen(false)}>
                Add to Queue
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
