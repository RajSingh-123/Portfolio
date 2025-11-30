// If 'next' types are not installed in this environment, silence the missing-module error.
// Remove the following @ts-ignore lines when developing inside a Next.js project with 'next' installed.
// @ts-ignore
import { NextResponse } from "next/server";
// @ts-ignore
import type { NextRequest } from "next/server";

/**
 * Middleware config - adjust matcher as needed. Here it runs on:
 * - /about (the page with the download)
 * - /           (optional home)
 * - /api/*      (if you'd like)
 */
export const config = {
  matcher: ["/about", "/"],
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // default variant
  let variant: "global" | "uae" = "global";

  try {
    // 1) Try built-in geo info (fast & private on platforms that set it)
    // req.geo is supported on Vercel/Edge; may be undefined on some hosts
    const country = (req.geo?.country || req.headers.get("x-vercel-ip-country") || "").toString().toUpperCase();
    if (country === "AE") {
      variant = "uae";
    } else if (country) {
      variant = "global";
    } else {
      // 2) Fallback: attempt a one-off IP-based lookup (best-effort)
      // Get client IP from X-Forwarded-For header (first entry)
      const xff = req.headers.get("x-forwarded-for") || "";
      const clientIp = xff.split(",")[0].trim();

      if (clientIp) {
        // ipapi.co returns country code at /{ip}/country/; low-volume free usage
        // Note: this is a server-side fetch (not visible to client). Replace provider if you prefer.
        const ipLookup = await fetch(`https://ipapi.co/${clientIp}/country/`);
        if (ipLookup.ok) {
          const cc = (await ipLookup.text()).trim().toUpperCase();
          if (cc === "AE") variant = "uae";
        }
      }
    }
  } catch (err) {
    // On any error, keep default (global)
    console.warn("middleware geo detection error:", err);
    variant = "global";
  }

  // Set cookie resume_variant for client (Path=/ so site-wide)
  // maxAge: 7 days
  res.cookies.set({
    name: "resume_variant",
    value: variant,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: false, // allow client read (for highlight). Set true if you prefer to read server-side only.
    sameSite: "lax",
  });

  return res;
}
