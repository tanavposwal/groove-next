"use client";

import { Button } from "./ui/button";
import { useRecoilState } from "recoil";
import { idState } from "../state/state";
import { ArrowBigDown, ArrowBigUp, Trash2 } from "lucide-react";

export default function Player({ id }: { id: string }) {
  const [ytid, setYtId] = useRecoilState(idState);
  return (
    <div className="flex gap-2 items-center">
      <Button variant="outline" size="sm" onClick={() => {setYtId(id)}}>
        Play
      </Button>
      <Button variant="ghost" size="icon">
        <ArrowBigUp className="scale-90" />
      </Button>
      <Button variant="ghost" size="icon">
        <ArrowBigDown className="scale-90" />
      </Button>
      <Button variant="ghost" size="icon">
        <Trash2 className="scale-75" />
      </Button>
    </div>
  );
}
