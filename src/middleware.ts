import type { NextRequest, NextFetchEvent } from "next/server";

const middleware = (req: NextRequest, ev: NextFetchEvent) => {
  if (req.nextUrl.pathname.startsWith("/chats")) {
  }
};

export default middleware;
