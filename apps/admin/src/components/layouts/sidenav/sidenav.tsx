"use client";

import { useAppSelector } from "@app/utils/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./sidenav.module.scss";

export default function SideNav() {
  const pathname = usePathname();
  const { links } = useAppSelector((state) => state.nav);

  if (links.length === 0) return <></>;

  return (
    <div className={classes.linkCon}>
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.title}
          data-active={link.href === pathname.split("/")[2] || undefined}
          className={classes.link}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
