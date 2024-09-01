"use client";

import { Button } from "./ui/button";
import { useRecoilState } from "recoil";
import { idState } from "../state/state";

export default function Player({ id }: { id: string }) {
  const [ytid, setYtId] = useRecoilState(idState);
  return (
    <div>
      <Button variant="outline" size="sm" onClick={() => {setYtId(id)}}>
        Play
      </Button>
    </div>
  );
}
