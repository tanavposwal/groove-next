import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import deleteSong from "@/actions/deleteSong";

export default function DeleteButton({ id, userId }: { id: string; userId: string }) {
  return (
    <div>
            <form action={deleteSong}>
        <input type="text" value={id} hidden name="id" />
        <input type="text" value={userId} hidden name="userId" />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" size="icon" type="submit">
              <Trash2 className="scale-75 stroke-1 opacity-70 hover:opacity-100" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove from queue</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      </form>
    </div>
  );
}
