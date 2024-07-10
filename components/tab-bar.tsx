"use client";

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full grid grid-cols-5 border-neutral-400 border-t px-5 py-3 bg-neutral-100">
      <Link href="/products" className="flex flex-col items-center gap-px">
        {pathname == "/products" ? (
          <SolidHomeIcon className="w-7 h-7" />
        ) : (
          <OutlineHomeIcon className="w-7 h-7" />
        )}
        <span>Home</span>
      </Link>
      <Link href="/feed" className="flex flex-col items-center gap-px">
        {pathname == "/feed" ? (
          <SolidNewspaperIcon className="w-7 h-7" />
        ) : (
          <OutlineNewspaperIcon className="w-7 h-7" />
        )}
        <span>Feed</span>
      </Link>
      <Link href="/chat" className="flex flex-col items-center gap-px">
        {pathname == "/chat" ? (
          <SolidChatIcon className="w-7 h-7" />
        ) : (
          <OutlineChatIcon className="w-7 h-7" />
        )}
        <span>Chat</span>
      </Link>
      <Link href="/live" className="flex flex-col items-center gap-px">
        {pathname == "/live" ? (
          <SolidVideoCameraIcon className="w-7 h-7" />
        ) : (
          <OutlineVideoCameraIcon className="w-7 h-7" />
        )}
        <span>Shopping</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname == "/profile" ? (
          <SolidUserIcon className="w-7 h-7" />
        ) : (
          <OutlineUserIcon className="w-7 h-7" />
        )}
        <span>My Page</span>
      </Link>
    </div>
  );
}

export default TabBar;
