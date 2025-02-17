"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminProfile } from "../grpc/admin_client";
import { Routes } from "../enums/routes";

export const getBaseUrl = async (headers: Headers) => {
  const host = headers.get("x-forwarded-host");
  const proto = headers.get("x-forwarded-proto");
  const baseURL = `${proto}://${host}`;
  return baseURL;
};

export const checkSession = async () => {
  const cookie = await cookies();
  const access_token = cookie.get("access_token")?.value;

  if (!access_token) {
    return redirect(Routes.Login);
  } else {
    const adminProfile = await AdminProfile();

    if (adminProfile) {
      return adminProfile;
    } else {
      return redirect(Routes.Login);
    }
  }
};

export const checkGuest = async () => {
  const cookie = await cookies();
  const access_token = cookie.get("access_token")?.value;

  if (access_token) {
    return redirect(Routes.Home);
  }
};

export interface SetCookieProps {
  [key: string]: string;
}

export const setCookie = async (values: SetCookieProps): Promise<void> => {
  const cookie = await cookies();

  for (const k in values) {
    cookie.set(k, values[k]);
  }

  return;
};

export const logout = async () => {
  const cookie = await cookies();
  cookie.delete("access_token");

  redirect(Routes.Login);
};
