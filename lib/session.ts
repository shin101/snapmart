import { getIronSession } from "iron-session";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface SessionContent {
  id?: number;
}

export function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "snapmart-cookie",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function logUserIn(userId: number) {
  const session = await getSession();
  session.id = userId;
  await session.save();
  redirect("/profile");
}
