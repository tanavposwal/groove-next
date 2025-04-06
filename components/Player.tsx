"use client";

import { Button } from "./ui/button";
import { useRecoilState } from "recoil";
import { idState } from "../state/state";
import { ArrowBigDown, ArrowBigUp, PauseIcon, PlayIcon } from "lucide-react";
import DeleteButton from "./DeleteButton";

export default function Player({ id, userId }: { id: string; userId: string }) {
  const [ytid, setYtId] = useRecoilState(idState);
  return (
    <div className="flex gap-2 items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          setYtId(id);
        }}
        className={`${id == ytid && "bg-white text-black"}`}>
        {id == ytid ? (
          <PauseIcon size={20} className="stroke-none fill-current" />
        ) : (
          <PlayIcon size={20} className="stroke-none fill-current" />
        )}
      </Button>
      <Button variant="ghost" size="icon">
        <ArrowBigUp size={20} />
      </Button>
      <Button variant="ghost" size="icon" type="submit">
        <ArrowBigDown size={20} />
      </Button>
      <DeleteButton id={id} userId={userId} />
    </div>
  );
}
