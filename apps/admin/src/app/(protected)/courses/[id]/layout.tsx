"use client";

import { setLinks } from "@app/components/layouts/nav/nav.slice";
import { useAppDispatch } from "@app/utils/store/store";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function CourseDetailLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setLinks({
        key: pathname,
        links: [
          { title: "Section", href: "section" },
          { title: "Chapter", href: "chapter" },
          { title: "Material", href: "material" },
        ],
      })
    );
  });

  return <>{children}</>;
}
