import type { NextRequest, NextFetchEvent } from "next/server";

const middleware = (req: NextRequest, ev: NextFetchEvent) => {
  console.log("!!GLOBAL MIDDLWARE!!");

  if (req.nextUrl.pathname.startsWith("/chats")) {
    console.log("!!Chat middleware!!");
  }
};

export default middleware;
