"use client";

import { useAppSelector } from "@app/utils/store/store";

export default function Home() {
  const authState = useAppSelector((state) => state.auth);

  return <div>Hello world s {authState.user.name}</div>;
}
