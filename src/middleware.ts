import { NextRequest, NextResponse } from "next/server";
import { DFAULT_LOGIN_REDIRECT } from "./routes";

export async function middleware(request: NextRequest) {
  console.log("ROUTE: ", request.nextUrl.pathname);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// export default auth((req) => {});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
