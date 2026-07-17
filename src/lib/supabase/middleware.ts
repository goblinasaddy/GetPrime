import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected paths
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth/login") ||
                     request.nextUrl.pathname.startsWith("/auth/callback");
  
  const isPublicPage = isAuthPage || 
                       request.nextUrl.pathname.startsWith("/_next") || 
                       request.nextUrl.pathname.startsWith("/favicon.ico");

  if (!user && !isPublicPage) {
    // Redirect unauthenticated users to login
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return { response: NextResponse.redirect(url), user };
  }

  if (user && isAuthPage) {
    // Redirect authenticated users trying to access login page back to home
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return { response: NextResponse.redirect(url), user };
  }

  return { response, user };
};
