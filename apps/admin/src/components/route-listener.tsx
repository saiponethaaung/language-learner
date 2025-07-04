"use client";

import { useAppDispatch } from "@app/utils/store/store";
import { useEffect } from "react";
import { resetNav } from "./layouts/nav/nav.slice";
import { usePathname } from "next/navigation";

export default function RouteListener({ children }: React.PropsWithChildren) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(resetNav());
  }, [pathname]);

  return <>{children}</>;
}
