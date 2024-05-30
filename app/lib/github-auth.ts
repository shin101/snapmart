export const getGithubProfile = async (access_token) =>
  await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-cache",
  });

const { id, avatar_url, login } = await getGithubProfile.json();

export const getGithubEmail = async (access_token) =>
  await fetch("https://api.github.com/user/emails", {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-cache",
  });
