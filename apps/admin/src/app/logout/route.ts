import { getBaseUrl } from "@app/utils/auth/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookie = await cookies();
  cookie.delete("access_token");

  return NextResponse.redirect(
    new URL("/login", await getBaseUrl(req.headers))
  );
}
