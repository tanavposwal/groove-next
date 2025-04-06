"use client";

export default function UserAvatar({ src }: { src: string }) {
  return (
    <div className="relative">
      <img className="rounded-full h-9 w-9" src={src} alt="user avatar" />
    </div>
  );
}
