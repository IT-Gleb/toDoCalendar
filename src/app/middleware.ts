import { LOGINPAGE_PATH, auth as middleware } from "@/auth";

// export default middleware((req) => {
//   if (!req.auth && req.nextUrl.pathname !== LOGINPAGE_PATH) {
//     const newUrl = new URL(LOGINPAGE_PATH, req.nextUrl.origin);
//     return Response.redirect(newUrl);
//   }
// });
export default middleware;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "api/:path*"],
};
