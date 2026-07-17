import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const next = searchParams.get("next") ?? "/";

  // If Supabase itself sent back an error (e.g. access_denied, provider disabled)
  if (error) {
    const params = new URLSearchParams({ error });
    if (errorDescription) params.set("error_description", errorDescription);
    return NextResponse.redirect(`${origin}/auth/login?${params.toString()}`);
  }

  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (!exchangeError) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }

    // Code exchange failed — pass real error back
    const params = new URLSearchParams({
      error: "AuthCallbackError",
      error_description: exchangeError.message ?? "Session exchange failed. Please try again.",
    });
    return NextResponse.redirect(`${origin}/auth/login?${params.toString()}`);
  }

  // No code and no error — malformed callback
  return NextResponse.redirect(
    `${origin}/auth/login?error=AuthCallbackError&error_description=No+authorization+code+was+returned+by+Supabase.+Check+your+Redirect+URL+configuration.`
  );
}
