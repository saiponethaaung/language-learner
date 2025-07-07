"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteListener({ children }: React.PropsWithChildren) {
  const pathname = usePathname();

  useEffect(() => {
    // TODO: implement action that depeneds on route change
  }, [pathname]);

  return <>{children}</>;
}
