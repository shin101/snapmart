import { redirect } from "next/navigation";

export async function GET() {
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user, user:email",
    allow_signup: "true",
  };

  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `https://github.com/login/oauth/authorize?${formattedParams}`;
  console.log(params);
  console.log(finalUrl);
  return redirect("https://www.google.com");
}
