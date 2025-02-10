"use client";

import { ClientLogin } from "@/grpc/admin_client";

export default function ActionBtn() {
  async function loginNow() {
    const data = await ClientLogin();
    console.log("data is", data.accessToken);
  }

  return <button onClick={loginNow}>Login</button>;
}
