import db from "@/lib/db";
import { logUserIn, getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

type EmailData = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
};

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, { status: 400 });
  }
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: { Accept: "application/json" },
  });

  const { error, access_token } = await accessTokenResponse.json();

  if (error) {
    return new Response(null, { status: 400 });
  }

  const getGithubProfile = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-cache",
  });

  const getGithubEmail = await fetch("https://api.github.com/user/emails", {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-cache",
  });

  const { id, avatar_url, login } = await getGithubProfile.json();
  const emailData: EmailData[] = await getGithubEmail.json();
  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });

  if (user) {
    return logUserIn(user.id);
  }

  const usernameExists = await db.user.findUnique({
    where: {
      username: login,
    },
  });

  const newUser = await db.user.create({
    data: {
      username: usernameExists ? `${login}-gh` : login,
      github_id: id + "",
      avatar: avatar_url,
      email: emailData?.find(
        (userEmail) => userEmail.primary && userEmail.verified
      )?.email,
    },
    select: {
      id: true,
    },
  });
  return logUserIn(newUser.id);
}
