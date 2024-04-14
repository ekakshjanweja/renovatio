import { NextRequest, NextResponse } from "next/server";
import { DFAULT_LOGIN_REDIRECT } from "./routes";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  console.log("ROUTE: ", request.nextUrl.pathname);
}

// export default auth((req) => {
//   // req.auth
// });

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
