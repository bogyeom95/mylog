import { redirect } from "next/navigation";

const githubBaseURL = process.env.OAUTH_GITHUB_BASE_URL;
const githubClientId = process.env.OAUTH_GITHUB_CLIENT_ID;
const githubReadScope = process.env.OAUTH_GITHUB_READ_SCOPE;

export function GET() {
  const params = {
    client_id: githubClientId!,
    scope: githubReadScope!,
    allow_signup: "true",
  };
  const formmatedParams = new URLSearchParams(params).toString();
  const finalURL = `${githubBaseURL}?${formmatedParams}`;
  return redirect(finalURL);
}
