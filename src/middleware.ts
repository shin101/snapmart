import { getIronSession } from "iron-session/edge";
import {
  type NextRequest,
  type NextFetchEvent,
  userAgent,
  NextResponse,
} from "next/server";

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  if (userAgent(req).isBot) {
    return new Response("Bots not allowed", { status: 403 });
  }
  const res = NextResponse.next();

  const session = await getIronSession(req, res, {
    cookieName: "snapmart",
    password: process.env.COOKIE_PW!,
    cookieOptions: {
      secure: process.env.NODE_ENV! === "production",
    },
  });

  if (!session.user && !req.url.includes("/enter")) {
    req.nextUrl.searchParams.set("from", req.nextUrl.pathname);
    req.nextUrl.pathname = "/enter";
    return NextResponse.redirect(req.nextUrl);
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
