"use client";

import { useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { useRecoilState } from 'recoil';
import { idState } from '../state/state';

export default function MiniWindows() {
  const playerRef = useRef<any>(null);
  const [ytid, setYtId] = useRecoilState(idState);
  
  const onReady = (event: any) => {
    playerRef.current = event.target;
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.loadVideoById(ytid);
    }
  }, [ytid])

  const opts = {
    height: "225",
    width: "400",
    playerVars: {
      autoplay: 0,
    },
  };
  
  return (
    <div className="rounded-md border overflow-hidden flex items-center justify-center">
      <YouTube videoId={ytid} opts={opts} onReady={onReady} />
    </div>
  );
}
