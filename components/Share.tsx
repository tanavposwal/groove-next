"use client";

import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { ShareIcon } from "lucide-react";
import { useState } from "react";

export default function Share() {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/share/${session?.user?.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <h3 className="text-md font-bold py-4">Share your queue</h3>

      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={handleCopyLink}
          className="flex items-center">
          <ShareIcon size={15} className="mr-2" />
          {copied ? "Copied!" : "Copy Share Link"}
        </Button>
      </div>
    </div>
  );
}
