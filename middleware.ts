export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/admin/:path*", "/organizer/:path*"],
  runtime: "nodejs",
};
