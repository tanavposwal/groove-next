import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DeleteButton() {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" size="icon">
              <Trash2 className="scale-75 stroke-1 opacity-70 hover:opacity-100" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove from queue</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
