"use client";

import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { useRecoilState } from "recoil";
import { idState } from "../state/state";
import { Minimize2, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";

export default function MiniWindows() {
  const playerRef = useRef<any>(null);
  const [ytid, setYtId] = useRecoilState(idState);
  const [open, setOpen] = useState(true);

  const onReady = (event: any) => {
    playerRef.current = event.target;
    playerRef.current.setPlaybackQuality("small");
    playerRef.current.playVideo();
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.loadVideoById(ytid);
      playerRef.current.playVideo();
    }
    // pause if same video is played again
    if (playerRef.current) {
      playerRef.current.pauseVideo();
    }
  }, [ytid]);

  const opts = {
    height: "225",
    width: "400",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="rounded-tl-lg border overflow-hidden flex flex-col items-center justify-center h-fit shadow-2xl">
      {/* for playing playlist */}
      {/* https://www.youtube.com/embed/VIDEO_ID_1?playlist=VIDEO_ID_2,VIDEO_ID_3,VIDEO_ID_4&autoplay=1 */}
      <div
        className={
          "transition-transform ease-in-out opacity-100 " +
          (open ? "translate-y-0 opacity-100" : "translate-y-full h-0")
        }>
        <YouTube videoId={ytid} opts={opts} onReady={onReady} />
      </div>
      <div className="flex bg-background justify-end items-center w-full z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setOpen(!open);
          }}
          className="scale-75">
          {open ? <Minimize2 /> : <Maximize2 />}
        </Button>
      </div>
    </div>
  );
}
