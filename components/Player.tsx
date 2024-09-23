"use client";

import { Button } from "./ui/button";
import { useRecoilState } from "recoil";
import { idState } from "../state/state";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import DeleteButton from "./DeleteButton";

export default function Player({ id, userId }: { id: string; userId: string }) {
  const [ytid, setYtId] = useRecoilState(idState);
  return (
    <div className="flex gap-2 items-center">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setYtId(id);
        }}
        className={`${id == ytid && "bg-white text-black"}`}
      >
        {id == ytid ? "Playing" : "Play"}
      </Button>
      <Button variant="ghost" size="icon">
        <ArrowBigUp className="scale-90 stroke-2 opacity-70 hover:opacity-100" />
      </Button>
      <Button variant="ghost" size="icon" type="submit">
        <ArrowBigDown className="scale-90 stroke-2 opacity-70 hover:opacity-100" />
      </Button>
      <DeleteButton id={id} userId={userId} />
    </div>
  );
}
