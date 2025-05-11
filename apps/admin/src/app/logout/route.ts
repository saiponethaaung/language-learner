import { getBaseUrl } from "@app/utils/auth/auth";
import { CookieKey } from "@app/utils/enums/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookie = await cookies();
  cookie.delete(CookieKey.ACCESS_TOKEN);

  return NextResponse.redirect(
    new URL("/login", await getBaseUrl(req.headers))
  );
}
